import { RunConfig } from '../models/config-model';
import * as async from 'async';
import * as fs from 'fs-extra';
import { getInputConnector, getOutputConnector } from '../loaders/io-loader';
import { Transformer } from '../transformer/transformer';
import * as graphSchema from '../schema/graph-schema.json';
import { GraphInfo } from '../models/graph-model';
import convertHrtime = require('convert-hrtime');

export function runCmd(configFile: string) {
  const timer = process.hrtime();
  const config = fs.readJSONSync(configFile);
  run(config, (err: any) => {
    if (err) {
      console.log(err.message);
    }
    const timeTaken = convertHrtime(process.hrtime(timer)).seconds;
    console.log(`process completed in ${timeTaken} seconds`);
  });
}

export function run(config: RunConfig, callback?: any) {
  const inputConnector = getInputConnector(
    config.input.type,
    config.input.config
  );
  const transformer = new Transformer(config.transform);
  const outputConnector = getOutputConnector(
    config.output.type,
    config.output.config
  );

  async.waterfall(
    [
      (cb: any) => inputConnector.readInput(cb),
      (data: any[], cb: any) =>
        transformer.transformInput(data, graphSchema, cb),
      (data: GraphInfo, cb: any) => outputConnector.saveOutput(data, cb),
    ],
    err => {
      if (callback) {
        callback(err);
      }
    }
  );
}
