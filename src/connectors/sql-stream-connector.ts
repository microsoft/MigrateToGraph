import * as knex from 'knex';

export class SQLStreamConnector {
  private client: knex;
  constructor(private config: any) {
    this.client = knex({
      client: config.dialect,
      connection: {
        host: config.host,
        user: config.username,
        password: config.password,
        database: config.database,
        options: config.options,
      },
    });
  }

  public stream(query?: string) {
    query = query || this.config.query;
    if (!query) {
      throw new Error('query cannot be null or empty');
    }
    return this.client
      .raw(query)
      .stream()
      .on('end', () => this.client.destroy());
  }
}
