const getNodeExecutablePath = require('./util/getNodeExecutablePath');
const executeCommand = require('./util/executeCommand');

function shelly(bot, message) {
  console.log(`Message received: ${message.text}`);
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

      executeCommand(
        `${getNodeExecutablePath()} src/program.js ${message.text}`
      )
        .then(result => {
          console.log(`Message response: ${result}`);

          let responseMessage;
          try {
            responseMessage = JSON.parse(result);
          } catch {
            responseMessage = {
              attachments: [
                {
                  text: '```' + result.trim() + '```',
                  color: '#0d8050',
                },
              ],
            };
          }
          updateResponse(responseMessage, err => {
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
                  text:
                    '```' +
                    `${error.stdout.trim() + error.stderr.trim()}` +
                    '```',
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
