const axios = require('axios');
require('dotenv').config();

async function sendZoomMessage(toJid, message) {
  const base64Credentials = Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`).toString('base64');

  const tokenResponse = await axios.post(
    'https://zoom.us/oauth/token?grant_type=client_credentials',
    {},
    {
      headers: { Authorization: `Basic ${base64Credentials}` },
    }
  );

  const accessToken = tokenResponse.data.access_token;

  await axios.post(
    'https://api.zoom.us/v2/im/chat/messages',
    {
      robot_jid: process.env.ZOOM_BOT_JID,
      to_jid: toJid,
      account_id: process.env.ZOOM_ACCOUNT_ID,
      content: {
        body: [{ type: 'message', text: message }],
      },
    },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
}

module.exports = { sendZoomMessage };
