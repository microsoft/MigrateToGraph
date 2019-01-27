import { ErrorObject } from 'ajv';
import * as jsonSrcMap from 'json-source-map';

export function ajvErrorLint(
  data: any,
  error: ErrorObject,
  errorText?: string
) {
  const srcMap = jsonSrcMap.stringify(data, undefined, 2);
  const errorPtr = srcMap.pointers[error.dataPath];
  const jsonStr = srcMap.json.split('\n');
  for (let i = errorPtr.value.line; i <= errorPtr.valueEnd.line; i++) {
    jsonStr[i] = ' * ' + jsonStr[i];
  }
  return errorText + '\n' + jsonStr.join('\n');
}
