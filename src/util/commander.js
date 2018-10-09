const minimist = require('minimist');
const stringArgv = require('string-argv');

class Commander {
  constructor(configuration) {
    this.configuration = configuration;
    this.helpCommandConfiguration = {
      command: 'help',
      action: (args, options) => {
        return {
          attachments: [
            {
              text: 'TODO: help',
              color: '#738694',
            },
          ],
        };
      },
    };
  }

  async execute(commandString) {
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

    return await commandConfiguration.action(commandArguments, commandOptions);
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
