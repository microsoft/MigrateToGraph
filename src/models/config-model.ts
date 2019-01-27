import { InputType, OutputType } from './connector-model';

export interface RunConfig {
  input: RunInputConfig;
  transform?: RunTransformConfigStringTemplate | RunTransformConfigTemplatePath;
  output: RunOutputConfig;
}

interface RunInputConfig {
  type: InputType;
  config: any;
}

interface RunOutputConfig {
  type: OutputType;
  config: any;
}

export interface RunTransformConfigStringTemplate {
  template: string;
}

export interface RunTransformConfigTemplatePath {
  templatePath: string;
}
