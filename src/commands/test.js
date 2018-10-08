const config = require('../config');
const errorExit = require('../util/errorExit');

module.exports = arg => {
  console.log(
    JSON.stringify({
      attachments: [
        {
          text: 'Response from test! Arg: ' + arg,
          color: '#0d8050',
        },
      ],
    })
  );
};
