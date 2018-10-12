const minimist = require('minimist');
const stringArgv = require('string-argv');

class Commander {
  constructor(configuration) {
    this.configuration = configuration;
    this.helpCommandConfiguration = {
      command: 'help',
      action: (args, options, context) => {
        return {
          attachments: [
            {
              text: `*Unknown command*.\nAvailable commands:\n${configuration
                .map(command => `- \`${command.command}\``)
                .join('\n')}`,
              color: '#738694',
            },
          ],
        };
      },
    };
  }

  async execute(commandString, context) {
    const argv = stringArgv(commandString, 'node', 'program.js');
    const result = minimist(argv.slice(2));

    const commands = result['_'];

    const command = commands[0];
    const commandArguments = commands.slice(1);
    const commandOptions = result;

    let commandConfiguration = this.configuration.find(
      commandConfiguration => commandConfiguration.command === command
    );

    if (commandConfiguration === undefined) {
      commandConfiguration = this.helpCommandConfiguration;
    }

    return await commandConfiguration.action(
      commandArguments,
      commandOptions,
      context
    );
  }
}

/**
 * Configuration:
 * [
 *   {
 *     command: string,
 *     action: ({args: []string, options: {string: string}}) =>
 *   },
 *   {}
 * ]
 *
 * @param configuration
 * @returns {Commander}
 */
module.exports = configuration => {
  return new Commander(configuration);
};
