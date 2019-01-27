import * as async from 'async';
import * as Sequelize from 'sequelize';
import { InputConnector } from '../models/connector-model';

export class SQLInputConnnector implements InputConnector {
  private connection: Sequelize.Sequelize;
  private query: string;
  constructor(config: any) {
    config.options = config.options || {};
    this.query = config.query;
    config.options.rowCollectionOnRequestCompletion = true;
    this.connection = new Sequelize(
      config.database,
      config.username,
      config.password,
      {
        dialect: config.dialect,
        dialectOptions: config.options,
        host: config.host,
        operatorsAliases: false,
        pool: {
          idle: 10000,
          max: 5,
          min: 0,
        },
      }
    );
  }

  public queryDatabase(query: string, callback: any): void {
    this.connection
      .query(query, { raw: false, type: Sequelize.QueryTypes.SELECT })
      .then(
        response => {
          callback(null, response);
        },
        error => {
          callback(error);
        }
      );
  }

  public readInput(callback: any): void {
    this.queryDatabase(this.query, (...args: any[]) => {
      this.closeConnection();
      callback(...args);
    });
  }

  public closeConnection() {
    this.connection.close();
  }
}
