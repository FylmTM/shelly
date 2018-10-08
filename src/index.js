require('dotenv').config();

const Botkit = require('botkit');
const shelly = require('./shelly');

const controller = Botkit.slackbot({});
const bot = controller.spawn({
  token: process.env.SLACK_TOKEN,
});

bot.startRTM(function(err, bot, payload) {
  if (err) {
    console.error(`Could not connect to Slack: ${err}`);
    throw new Error(`Could not connect to Slack: ${err}`);
  }
});

controller.on('direct_message', shelly);
controller.on('direct_mention', shelly);

controller.on('rtm_close', () => {
  console.log('RTM Connection closed, exit: 1.');
  process.exit(1);
});

process.on('exit', function() {
  console.log('Process exited, closing RTM connection if open.');
  bot.closeRTM();
});
