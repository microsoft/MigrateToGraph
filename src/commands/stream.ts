import { jsonStreamReader, getStreamReader } from '../stream/reader';
import * as through2 from 'through2';
import * as transform from 'parallel-transform';
import { Transformer } from '../transformer/transformer';
import * as schema from '../schema/graph-schema.json';
import * as fs from 'fs-extra';
import { gremlinCmdStreamWriter, getStreamWriter } from '../stream/writer';
import { tranformToGraphInfo } from '../stream/transform';
import convertHrtime = require('convert-hrtime');

export function streamCmd(configFile: any) {
  const timer = process.hrtime();
  const config = fs.readJSONSync(configFile);
  stream(config, (err: Error) => {
    if (err) {
      console.log(err);
    }
    const timeTaken = convertHrtime(process.hrtime(timer)).seconds;
    console.log(`process completed in ${timeTaken} seconds`);
  });
}

export function stream(config: any, callback: any) {
  return getStreamReader(config.input.type, config.input.config)
    .pipe(tranformToGraphInfo(config.transform.config))
    .pipe(
      transform(config.output.config.batchSize, (data, cb) => {
        cb(null, data);
      })
    )
    .pipe(getStreamWriter(config.output.type, config.output.config))
    .on('error', (err: Error) => console.error(err))
    .on('finish', callback);
}
