const Command = require('commander').Command;
const version = require('../package.json').version;
const errorExit = require('./util/errorExit');

const test = require('./commands/test');

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
  .command('test <arg>')
  .description('Test Action')
  .action(test);

program.parse(process.argv);
