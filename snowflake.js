const axios = require('axios');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();

function createSnowflakeJwt() {
  const privateKey = fs.readFileSync(process.env.RSA_PRIVATE_KEY_PATH, 'utf8');

  const payload = {
    iss: `${process.env.SNOWFLAKE_ACCOUNT}/${process.env.SNOWFLAKE_ACCOUNT}`,
    sub: process.env.SNOWFLAKE_ACCOUNT,
    aud: 'snowflake',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiry
  };

  return jwt.sign(payload, privateKey, { algorithm: 'RS256' });
}

async function queryCortexWithFallback(prompt) {
  const token = createSnowflakeJwt();

  const agentResponse = await axios.post(
    process.env.SNOWFLAKE_AGENT_ENDPOINT,
    {
      prompt,
      tools: [
        { type: 'cortex_analyst_text_to_sql', semantic_model: process.env.SUPPORT_SEMANTIC_MODEL },
        { type: 'cortex_search', search_service: process.env.VEHICLE_SEARCH_SERVICE }
      ]
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const choice = agentResponse.data.choices?.[0]?.message;
  const sql = choice?.tool_use?.sql;

  if (sql) {
    const dataResponse = await axios.post(
      `https://${process.env.SNOWFLAKE_ACCOUNT}.snowflakecomputing.com/queries/v1/query-request`,
      {
        sqlText: sql,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const dataframe = dataResponse.data.data;

    const inferenceResponse = await axios.post(
      process.env.SNOWFLAKE_INFERENCE_ENDPOINT,
      {
        prompt: `Explain this data in plain English: ${JSON.stringify(dataframe)}`
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return inferenceResponse.data.choices?.[0]?.message?.content || 'No explanation found.';
  }

  return choice?.content || 'No response found.';
}

module.exports = { queryCortexWithFallback };