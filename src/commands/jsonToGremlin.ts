import * as fs from 'fs-extra';
import * as GraphHelper from '../helpers/graphHelper';
import * as graphSchema from '../schema/graph-schema.json';
import { Transformer } from '../transformer/transformer';

export function jsonToGremlinCmd(
  inputFile: string,
  templateFile: string,
  outputFile: string
) {
  const inputJSON = fs.readJSONSync(inputFile) as any[];
  const template = fs.readFileSync(templateFile, { encoding: 'utf-8' });
  try {
    const graphCmdList: string[] = jsonToGremlin(inputJSON, template);
    fs.writeFileSync(outputFile, graphCmdList.join('\n'));
  } catch (err) {
    console.log(err.message);
  }
}

export function jsonToGremlin(inputJSON: any[], template: string): string[] {
  const transformer = new Transformer({});
  const result = transformer.transformJSON(template, inputJSON, graphSchema);
  const vertexCmdList: string[] = result.vertices.map(vertex =>
    GraphHelper.getAddVertexQuery(vertex)
  );
  const edgeCmdList: string[] = result.edges.map(edge =>
    GraphHelper.getAddEdgeQuery(edge)
  );
  return vertexCmdList.concat(edgeCmdList);
}
