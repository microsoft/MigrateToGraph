#!/usr/bin/env node --no-warnings
import * as program from 'commander';
import {
  jsonToGraphCmd,
  jsonToGremlinCmd,
  sqlToGraphCmd,
  runCmd,
} from './index';
import { streamJSONCmd } from './commands/stream';

program
  .version('0.0.1')
  .command('run <configFile>')
  .action((configFile: string) => {
    console.log('Executing run command');
    runCmd(configFile);
  });
// Will be added once complete
program.command('stream <configFile>').action((configFile: string) => {
  console.log('Executing run command');
  streamJSONCmd(configFile);
});
program
  .command('jsontogremlin <inputFile> <templateFile> <outputFile>')
  .action((inputFile: string, templateFile: string, outputFile: string) => {
    console.log('Executing JSON to Gremlin command');
    jsonToGremlinCmd(inputFile, templateFile, outputFile);
  });
program
  .command('jsontograph <inputFile> <templateFile> <graphConfigFile>')
  .action(
    (inputFile: string, templateFile: string, graphConfigFile: string) => {
      console.log('Executing JSON to Graph command');
      jsonToGraphCmd(inputFile, templateFile, graphConfigFile);
    }
  );

program
  .command(
    'sqltograph <sqlConfigFile> <query> <templateFile> <graphConfigFile>'
  )
  .action(
    (
      sqlConfigFile: string,
      query: string,
      templateFile: string,
      graphConfigFile: string
    ) => {
      console.log('Executing SQL to Graph command');
      sqlToGraphCmd(sqlConfigFile, query, templateFile, graphConfigFile);
    }
  );

program.on('command:*', () => {
  console.error(
    'Invalid command: %s\nSee --help for a list of available commands.',
    program.args.join(' ')
  );
  process.exit(1);
});

if (process.argv.length < 3) {
  program.help();
}

program.parse(process.argv);
