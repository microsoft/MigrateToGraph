import * as async from 'async';
import * as convertHrtime from 'convert-hrtime';
import * as Gremlin from 'gremlin';
import { stdout as log } from 'single-line-log';
import * as GraphHelper from '../helpers/graphHelper';
import { Edge, Etype, GraphInfo, Vertex } from '../models/graph-model';
import { isNullOrUndefined } from 'util';
import { OutputConnector } from '../models/connector-model';

export class GremlinConnector implements OutputConnector {
  private client: Gremlin.GremlinClient;
  private batchSize: number;
  private upsert: boolean;
  private retry: number;
  private defaultRetry = 3;
  private defaultBatchSize = 10;

  constructor(config: any) {
    this.client = Gremlin.createClient(config.port, config.host, {
      password: config.password,
      session: false,
      ssl: true,
      user: config.user,
    });
    this.batchSize = config.batchSize
      ? config.batchSize
      : this.defaultBatchSize;
    this.upsert = config.upsert;
    this.retry = config.retry ? config.retry : this.defaultRetry;
  }

  public createGraph(graphInfo: GraphInfo, callback: any) {
    async.series(
      [
        (cb: any) => {
          this.addVertices(graphInfo.vertices, cb);
        },
        (cb: any) => {
          this.addEdges(graphInfo.edges, cb);
        },
      ],
      err => callback(err)
    );
  }

  public addVertices(vertices: Vertex[], callback: any) {
    const timer = process.hrtime();
    this.addToGraph(Etype.vertex, vertices, (err: any) => {
      if (!err) {
        console.log('\nFinished adding vertices');
        const timeTaken = convertHrtime(process.hrtime(timer)).seconds;
        console.log(
          `Added ${vertices.length} vertices in ${timeTaken} seconds`
        );
      }
      callback(err);
    });
  }

  public addEdges(edges: Edge[], callback: any) {
    const timer = process.hrtime();
    this.addToGraph(Etype.edge, edges, (err: any) => {
      if (!err) {
        console.log('\nFinished adding edges');
        const timeTaken = convertHrtime(process.hrtime(timer)).seconds;
        console.log(`Added ${edges.length} edges in ${timeTaken} seconds`);
      }
      callback(err);
    });
  }

  public saveOutput(data: GraphInfo, callback: any) {
    this.createGraph(data, (err: any) => {
      this.client.closeConnection();
      callback(err);
    });
  }

  public closeConnection() {
    this.client.closeConnection();
  }

  public checkExists(type: Etype, id: string, callback: any) {
    if (!this.upsert || isNullOrUndefined(id)) {
      callback(null, false);
      return;
    }
    let query: string;
    if (type === Etype.vertex) {
      query = `g.V().hasId('${id}').count()`;
    } else {
      query = `g.E().hasId('${id}').count()`;
    }
    this.client.execute(query, (err, res) => {
      let exists = false;
      if (res && res.length > 0 && res[0] > 0) {
        exists = true;
      }
      callback(err, exists);
    });
  }

  private addToGraph(type: Etype, arr: Vertex[] | Edge[], callback: any) {
    const timer = process.hrtime();
    const retryableIterator = this.getRetryable(
      this.vertexEdgeIterator.bind(this)
    );
    let completedCnt = 0;
    async.eachOfLimit(
      arr as Vertex[] & Edge[],

      this.batchSize,
      (value, key, cb) => {
        retryableIterator(type, value, (err: any) => {
          if (!err) {
            log(`Added(${type}): ${++completedCnt}/${arr.length}`);
          }
          cb(err);
        });
      },
      err => {
        callback(err);
      }
    );
  }

  private vertexEdgeIterator(type: Etype, value: Vertex | Edge, callback: any) {
    const id = value.id;

    async.waterfall(
      [
        (cb: any) => this.checkExists(type, id, cb),
        (res: boolean, cb: any) => {
          const command = this.getCommand(type, value, res);
          this.client.execute(command, cb);
        },
      ],
      callback
    );
  }

  private getRetryable(task: any) {
    if (this.retry > 0) {
      return async.retryable(
        {
          interval: retryCount => {
            return 500 * Math.pow(2, retryCount);
          },
          times: this.retry,
        },
        task
      );
    } else {
      return task;
    }
  }

  private getCommand(
    type: Etype,
    value: Vertex | Edge,
    update: boolean = false
  ): string {
    if (type === Etype.vertex) {
      return update
        ? GraphHelper.getUpdateVertexQuery(value as Vertex)
        : GraphHelper.getAddVertexQuery(value as Vertex);
    } else {
      return update
        ? GraphHelper.getUpdateEdgeQuery(value as Edge)
        : GraphHelper.getAddEdgeQuery(value as Edge);
    }
  }
}
