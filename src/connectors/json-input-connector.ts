import { InputConnector } from '../models/connector-model';
import * as fs from 'fs-extra';

export class JSONInputConnector implements InputConnector {
  private config: any;

  constructor(config: any) {
    this.config = config;
  }

  public readInput(callback: any): void {
    if (this.config.data) {
      callback(null, this.config.data);
    } else if (this.config.filePath) {
      fs.readJSON(this.config.filePath, { encoding: 'utf-8' }, callback);
    } else {
      callback(new Error('JSON filePath not provided in config'));
    }
  }
}
