require('dotenv').config();
const express = require('express');
const { sendZoomMessage } = require('./zoom');
const { queryCortexWithFallback } = require('./snowflake');

const app = express();
app.use(express.json());

app.post('/botendpoint', async (req, res) => {
  try {
    const userMessage = req.body.payload.cmd;
    const toJid = req.body.payload.toJid;

    const finalAnswer = await queryCortexWithFallback(userMessage);
    await sendZoomMessage(toJid, finalAnswer);

    res.status(200).send('OK');
  } catch (error) {
    console.error('Error handling botendpoint:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
