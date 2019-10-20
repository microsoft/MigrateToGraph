import { Transformer } from '../transformer/transformer';
import * as fs from 'fs-extra';
import * as schema from '../schema/graph-schema.json';
import * as ejs from 'ejs';
import * as through2 from 'through2';
import * as Ajv from 'ajv';
import { ajvErrorLint } from '../utils/ajvErrorLint';
import * as jsonlint from 'jsonlint';
import { GraphInfo } from '../models/graph-model';

export function tranformToGraphInfo(config: any) {
  return through2.obj((chunck, enc, callback) => {
    const renderedTemplate = ejsTransform(config, chunck);
    const json: GraphInfo = jsonlint.parse(renderedTemplate);
    if (validateJSON(json, schema)) {
      callback(null, json);
    }
  });
}

function ejsTransform(config: any, obj: any) {
  let template: string = getTemplate(config);
  const strt = /"<%/g;
  const end = /%>"/g;
  template = template.replace(strt, '<%').replace(end, '%>');
  const opts: ejs.Options = {
    escape: str => JSON.stringify(str),
  };
  return ejs.render(template, { obj }, opts) as string;
}

function getTemplate(config: any) {
  if (config.templatePath) {
    return fs.readFileSync(config.templatePath, { encoding: 'utf-8' });
  } else if (config.template) {
    return config.template;
  } else {
    throw new Error('template not specified in transform config');
  }
}

function validateJSON(json: any, schema: object): boolean {
  const validator = new Ajv({ jsonPointers: true });
  const valid = validator.validate(schema, json) as boolean;
  if (!valid) {
    const output = ajvErrorLint(
      json,
      validator.errors![0] as Ajv.ErrorObject,
      validator.errorsText()
    );
    throw new Error('Schema validation error: \n' + output);
  }
  return valid;
}
