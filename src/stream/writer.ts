import * as writer from 'flush-write-stream';
import * as fs from 'fs-extra';
import * as through2 from 'through2';
import { GraphInfo } from '../models/graph-model';
import * as GraphHelper from '../helpers/graphHelper';
import * as Gremlin from 'gremlin';
import { GremlinConnector } from '../connectors/gremlin-connector';

export function getStreamWriter(type: string, config: any) {
  switch (type) {
    case 'gremlinCmd':
      return gremlinCmdStreamWriter(config);
    case 'gremlinDb':
      return gremlindbStreamWriter(config);
  }
}

export function gremlinCmdStreamWriter(config: any) {
  const fileWriteStream = fs.createWriteStream(config.filePath, {
    encoding: 'utf-8',
    flags: 'w',
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

export function gremlindbStreamWriter(config: any) {
  const gremlinConnector = new GremlinConnector(config);
  return writer.obj(
    (chunck: GraphInfo, enc, callback) => {
      gremlinConnector.createGraph(chunck, callback);
    },
    callback => {
      gremlinConnector.closeConnection();
      callback();
    }
  );
}
