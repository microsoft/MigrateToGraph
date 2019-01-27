import * as Ajv from 'ajv';
import * as handlebars from 'handlebars';
import * as jsonlint from 'jsonlint';
import * as uuid from 'uuid';
import * as fs from 'fs-extra';
import * as GraphHelper from '../helpers/graphHelper';
import { Edge, GraphInfo, Vertex } from '../models/graph-model';
import { ajvErrorLint } from '../utils/ajvErrorLint';
import {
  RunTransformConfigTemplatePath,
  RunTransformConfigStringTemplate,
} from '../models/config-model';

export class Transformer {
  private validator: Ajv.Ajv;
  private config: RunTransformConfigStringTemplate &
    RunTransformConfigTemplatePath;

  constructor(config?: any) {
    this.config = config;
    this.registerHelpers();
    this.validator = new Ajv({ jsonPointers: true });
  }

  public parseTemplate(template: string, data: object): string {
    const compiledTemplate = this.getCompiledTemplate(template);
    return compiledTemplate(data);
  }

  public transformJSON(
    template: string,
    jsonArray: object[],
    validationSchema?: object
  ): GraphInfo {
    let vertices: Vertex[] = [];
    let edges: Edge[] = [];

    const compiledTemplate = this.getCompiledTemplate(template);

    jsonArray.forEach(doc => {
      const transformedDoc = compiledTemplate(doc);
      const result: GraphInfo = jsonlint.parse(transformedDoc);
      if (validationSchema) {
        this.validateJSON(result, validationSchema);
      }

      vertices = vertices.concat(result.vertices);
      edges = edges.concat(result.edges);
    });

    vertices = GraphHelper.removeDuplicateVertexes(vertices);
    edges = GraphHelper.removeDuplicateEdges(edges);
    return { vertices, edges };
  }

  public transformInput(data: any[], schema: object, callback: any) {
    const template = this.getTemplateFromConfig();
    if (template) {
      const result = this.transformJSON(template, data, schema);
      callback(null, result);
    } else {
      callback(null, data);
    }
  }

  public validateJSON(json: any, schema: object) {
    const valid = this.validator.validate(schema, json);
    if (!valid) {
      const output = ajvErrorLint(
        json,
        this.validator.errors![0] as Ajv.ErrorObject,
        this.validator.errorsText()
      );
      throw new Error('Schema validation error: \n' + output);
    }
    return valid;
  }

  private getTemplateFromConfig() {
    let template = '';
    if (this.config && this.config.template) {
      template = this.config.template;
    } else if (this.config && this.config.templatePath) {
      template = fs.readFileSync(this.config.templatePath, {
        encoding: 'utf-8',
      });
    }
    return template;
  }

  private registerHelpers(): void {
    handlebars.registerHelper('$guid', () => uuid.v4());
    handlebars.registerHelper('toJSON', object => {
      return new handlebars.SafeString(JSON.stringify(object));
    });
  }

  private getCompiledTemplate(template: string) {
    return handlebars.compile(template);
  }
}
