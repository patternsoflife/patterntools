#!/usr/bin/env node

/**
 * Main entrypoint for the patternjs command-line interface.
 */

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';


yargs(hideBin(process.argv))

  // Define general help information.
  .scriptName('patternjs')
  .usage('$0 <cmd> [args]')
  .epilogue('To get help about a specific command, run: patternjs <cmd> -h')
  .help()
  .alias('h', 'help')

  // Global options
  .option('debug', {
    type: 'boolean',
    default: false,
    global: true,
    describe: 'output debug information while running',
  })

  // Define the svg command.
  .command({
    command: 'svg <pattern>',
    describe: 'generate an svg image of a pattern (requires definitions)',
    builder: (yargs) => (yargs
      .positional('pattern', {
        describe: 'a json file containing a pattern',
        type: 'string',
        demandOption: true,
      })
    ),
    handler: async (argv) => {
      const { writeSVG } = await import('./svg.js');
      await writeSVG(argv.pattern, argv.debug);
    }
  })

  // Fail when there are insufficient or unrecognized arguments.
  .demandCommand(1)
  .strict()

  // Parse arguments and run the selected command.
  .parse();
