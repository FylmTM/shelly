const config = require('../config');
const errorExit = require('../util/errorExit');

module.exports = () => {
  console.log(
    JSON.stringify({
      attachments: [
        {
          text: 'Empty sprint status',
          color: '#0d8050',
        },
      ],
    })
  );
};
