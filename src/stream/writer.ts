import * as writer from 'flush-write-stream';
import * as fs from 'fs-extra';
import * as through2 from 'through2';
import { GraphInfo } from '../models/graph-model';
import * as GraphHelper from '../helpers/graphHelper';

export function gremlinCmdStreamWriter(config: any) {
  const fileWriteStream = fs.createWriteStream(config.filePath, {
    encoding: 'utf-8',
    flags: 'w'
  });
  return writer.obj(
    (chunck: GraphInfo, enc, callback) => {
      chunck.vertices.forEach(vertex => {
        const cmd = GraphHelper.getAddVertexQuery(vertex);
        fileWriteStream.write(cmd + '\n');
      });
      chunck.edges.forEach(edge => {
        const cmd = GraphHelper.getAddEdgeQuery(edge);
        fileWriteStream.write(cmd + '\n');
      });
      callback();
    },
    callback => {
      fileWriteStream.end(callback());
    }
  );
}
