const Command = require('commander').Command;
const version = require('../package.json').version;
const errorExit = require('./util/errorExit');

const sprintTest = require('./commands/sprint-status');

const program = new Command('@shelly');

program.version(version);

program
  .command('help')
  .description('Show help.')
  .action(() => {
    program.outputHelp();
  });

program.on('command:*', function() {
  console.log(
    `Invalid command: ${program.args.join(
      ' '
    )}\nSee help for a list of available commands.`
  );
  errorExit();
});

program
  .command('sprint-status')
  .description('Show current JIRA Sprint status')
  .action(sprintTest);

program.parse(process.argv);
