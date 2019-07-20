import { jsonStreamReader, getStreamReader } from '../stream/reader';
import * as through2 from 'through2';
import * as transform from 'parallel-transform';
import { Transformer } from '../transformer/transformer';
import * as schema from '../schema/graph-schema.json';
import * as fs from 'fs-extra';
import { gremlinCmdStreamWriter, getStreamWriter } from '../stream/writer';
import { tranformToGraphInfo } from '../stream/transform';

export function streamCmd(configFile: any) {
  const config = fs.readJSONSync(configFile);
  stream(config, (err: Error) => console.log(err));
}

export function stream(config: any, callback: any) {
  return getStreamReader(config.input.type, config.input.config)
    .pipe(tranformToGraphInfo(config.transform.config))
    .pipe(
      transform(config.output.config.batchSize, (data, callback) => {
        callback(null, data);
      })
    )
    .pipe(getStreamWriter(config.output.type, config.output.config))
    .on('error', (err: Error) => console.error(err))
    .on('end', callback);
}

// export function streamJSONCmd(configFile: string) {
//   const config = fs.readJSONSync(configFile);
//   streamJSON(config, () => console.log('stream ended'));
// }

export function streamJSON(config: any, callback: any) {
  return getStreamReader(config.input.type, config.input.config)
    .pipe(
      through2.obj(function(chunck, enc, callback) {
        const transformer = new Transformer(config.transform);
        transformer.transformInput(
          [chunck],
          schema,
          (err: any, result: any) => {
            if (!err) {
              this.push(result);
              callback();
            }
          }
        );
      })
    )
    .pipe(
      transform(config.output.batchSize, (data, callback) => {
        callback(null, data);
      })
    )
    .pipe(gremlinCmdStreamWriter(config.output))
    .on('error', (err: Error) => console.error(err))
    .on('end', callback);
}
