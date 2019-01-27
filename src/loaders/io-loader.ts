import {
  InputConnector,
  InputType,
  OutputType,
} from '../models/connector-model';
import { SQLInputConnnector } from '../connectors/sql-input-connector';
import { JSONInputConnector } from '../connectors/json-input-connector';
import { GremlinConnector } from '../connectors/gremlin-connector';
import { GremlinCmdOutputConnector } from '../connectors/gremlinCmd-output-connector';

export function getInputConnector(
  type: InputType,
  config: any
): InputConnector {
  switch (type) {
    case InputType.sql: {
      return new SQLInputConnnector(config);
    }
    case InputType.json: {
      return new JSONInputConnector(config);
    }
    default: {
      throw new Error('Invalid input type');
    }
  }
}

export function getOutputConnector(type: OutputType, config: any) {
  switch (type) {
    case OutputType.gremlinGraph: {
      return new GremlinConnector(config);
    }
    case OutputType.gremlinCmd: {
      return new GremlinCmdOutputConnector(config);
    }
    default: {
      throw new Error('Invalid output type');
    }
  }
}
