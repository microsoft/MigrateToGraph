import * as fs from 'fs-extra';
import { GremlinConnector } from '../connectors/gremlin-connector';
import * as graphSchema from '../schema/graph-schema.json';
import { Transformer } from '../transformer/transformer';

export function jsonToGraphCmd(
  inputFile: string,
  templateFile: string,
  graphConfigFile: string
) {
  const inputJSON = fs.readJSONSync(inputFile) as any[];
  const template = fs.readFileSync(templateFile, { encoding: 'utf-8' });
  const graphConfig = fs.readJsonSync(graphConfigFile);
  jsonToGraph(inputJSON, template, graphConfig, err => {
    if (err) {
      console.log(err.message);
    }
  });
}

export function jsonToGraph(
  inputJSON: any[],
  template: string,
  graphConfig: any,
  callback?: (err: any) => void
): void {
  const transformer = new Transformer({});
  const result = transformer.transformJSON(template, inputJSON, graphSchema);
  const connector = new GremlinConnector(graphConfig);

  connector.createGraph(result, (err: any) => {
    connector.closeConnection();
    if (callback) {
      callback(err);
    }
  });
}
