import * as async from 'async';
import * as fs from 'fs-extra';
import { GremlinConnector } from '../connectors/gremlin-connector';
import { SQLInputConnnector } from '../connectors/sql-input-connector';
import * as graphSchema from '../schema/graph-schema.json';
import { Transformer } from '../transformer/transformer';

export function sqlToGraphCmd(
  sqlConfigFile: string,
  query: string,
  templateFile: string,
  graphConfigFile: string
) {
  const sqlConfig = fs.readJSONSync(sqlConfigFile);
  const template = fs.readFileSync(templateFile, { encoding: 'utf-8' });
  const graphConfig: any = fs.readJSONSync(graphConfigFile);
  sqlToGraph(sqlConfig, query, template, graphConfig, err => {
    if (err) {
      console.log(err.message);
    }
  });
}

export function sqlToGraph(
  sqlConfig: any,
  query: string,
  template: string,
  graphConfig: any,
  callback?: (err: any) => void
) {
  const sqlConnector = new SQLInputConnnector(sqlConfig);
  const graphConnector = new GremlinConnector(graphConfig);

  async.waterfall(
    [
      (cb: any) => {
        sqlConnector.queryDatabase(query, cb);
      },
      (rows: any[], cb: any) => {
        const transformer = new Transformer({});
        const result = transformer.transformJSON(template, rows, graphSchema);
        graphConnector.createGraph(result, cb);
      },
    ],
    err => {
      sqlConnector.closeConnection();
      graphConnector.closeConnection();
      if (callback) {
        callback(err);
      }
    }
  );
}
