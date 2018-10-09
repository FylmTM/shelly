const COLOR_SUCCESS = '#0d8050';
const COLOR_ERROR = '#c23030';
const COLOR_INFO = '#738694';

const errorMessage = text => ({
  attachments: [
    {
      text,
      color: COLOR_ERROR,
    },
  ],
});

exports.COLOR_SUCCESS = COLOR_SUCCESS;
exports.COLOR_ERROR = COLOR_ERROR;
exports.COLOR_INFO = COLOR_INFO;

exports.errorMessage = errorMessage;
