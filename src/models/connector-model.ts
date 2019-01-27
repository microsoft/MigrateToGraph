export interface InputConnector {
  readInput(callback: any): void;
}

export interface OutputConnector {
  saveOutput(data: any, callback: any): void;
}

export enum InputType {
  sql = 'sql',
  json = 'json',
}

export enum OutputType {
  gremlinGraph = 'gremlinGraph',
  gremlinCmd = 'gremlinCmd',
}
