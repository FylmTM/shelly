const commander = require('./commander');

const sprintStatus = require('./commands/sprint-status');

const program = commander([
  {
    command: 'sprint-status',
    action: sprintStatus,
  },
]);

module.exports = program;
