const program = require('./program');

function shelly(bot, message) {
  console.log(`Message received: ${message.text}`);

  let messageText = message.text;
  if (messageText.startsWith('Reminder: ')) {
    messageText = messageText.substring(
      messageText.indexOf('$') + 1,
      messageText.lastIndexOf('$')
    );
  }

  console.log(`Message received (normalized): ${messageText}`);

  bot.replyAndUpdate(
    message,
    {
      attachments: [
        {
          text: 'Command execution in progress...',
          color: '#738694',
        },
      ],
    },
    (error, src, updateResponse) => {
      if (error) console.error(error);

      program
        .execute(messageText, {
          sourceMessage: src,
        })
        .then(result => {
          console.log('Message response:', result);
          updateResponse(result, err => {
            if (err) {
              console.error('Failed to update response', err);
            }
          });
        })
        .catch(error => {
          console.log(`Message error: ${error}`);
          updateResponse(
            {
              attachments: [
                {
                  text: error.toString(),
                  color: '#c23030',
                },
              ],
            },
            err => {
              if (err) {
                console.error('Failed to update response', err);
              }
            }
          );
        });
    }
  );
}

module.exports = shelly;
