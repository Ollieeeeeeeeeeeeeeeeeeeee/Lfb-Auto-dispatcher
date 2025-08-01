const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const BOT_TOKEN = 'MTQwMDczNTIzOTc2ODM3NTM3Ng.GqoQWA.yK371qTMlA6v6ZRoqP2Fi1Ucv7JRewZOllKyug';
const CHANNEL_ID = '1400722751823544381';

const bot = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

bot.login(BOT_TOKEN);

app.use(bodyParser.json());

app.post('/erlc/callout', async (req, res) => {
  const data = req.body;

  // Sample expected callout payload from ERLC
  const { service, call_type, location, description } = data;

  if (service === 'FD') {
    const message = `LFB Callout, Callout, Callout\n Location: ${location}\n Type: ${call_type}\n ${description || 'AUTO-DISPATCH SYSTEM.'}`;

    try {
      const channel = await bot.channels.fetch(CHANNEL_ID);
      channel.send({ content: message, tts: true }); // <<<< TTS enabled
      res.status(200).send('Callout received');
    } catch (err) {
      console.error('Discord error:', err);
      res.status(500).send('Discord error');
    }
  } else {
    res.status(200).send('Not an FD callout');
  }
});

app.listen(port, () => {
  console.log(`ERLC Webhook listening on http://localhost:${port}`);
});
