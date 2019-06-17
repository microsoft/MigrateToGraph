import { jsonStreamReader } from '../stream/reader';
import * as through2 from 'through2';
import * as transform from 'parallel-transform';
import { Transformer } from '../transformer/transformer';
import * as schema from '../schema/graph-schema.json';
import * as fs from 'fs-extra';

export function streamJSONCmd(configFile: string) {
  let config = fs.readJSONSync(configFile);
  streamJSON(config, () => console.log('stream ended'));
}

export function streamJSON(config: any, callback: any) {
  return jsonStreamReader(config.input)
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
        setTimeout(() => callback(null, JSON.stringify(data) + '\n\n'), 2000);
      })
    )
    .pipe(process.stdout)
    .on('error', err => console.error(err))
    .on('end', callback);
}
