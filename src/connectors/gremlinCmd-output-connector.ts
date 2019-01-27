import { OutputConnector } from '../models/connector-model';
import * as fs from 'fs-extra';
import * as async from 'async';
import * as GraphHelper from '../helpers/graphHelper';
import { GraphInfo } from '../models/graph-model';

export class GremlinCmdOutputConnector implements OutputConnector {
  private config: any;
  constructor(config: any) {
    this.config = config;
  }

  public saveOutput(data: GraphInfo, callback: any): void {
    if (!this.config || !this.config.fileName) {
      callback(new Error('fileName not specified in output config'));
    }
    const fileName = this.config.fileName;
    const vertices = data.vertices.map(c => GraphHelper.getAddVertexQuery(c));
    const edges = data.edges.map(c => GraphHelper.getAddEdgeQuery(c));
    const commands = vertices.concat(edges);
    fs.writeFile(
      fileName,
      commands.join('\n'),
      { encoding: 'utf-8' },
      callback
    );
  }
}
