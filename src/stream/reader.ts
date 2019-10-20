import * as knex from 'knex';
import * as fs from 'fs-extra';
import * as JSONStream from 'JSONStream';
import * as stream from 'stream';

export function getStreamReader(type: string, config: any) {
  switch (type) {
    case 'sql':
      return sqlStreamReader(config);
    case 'json':
      return jsonStreamReader(config);
    default:
      throw new Error(`Invalid input type ${type}`);
  }
}

export function sqlStreamReader(config: any) {
  const client = knex({
    client: config.dialect,
    connection: {
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database,
      options: config.options,
    },
  });
  const query = config.query;
  if (!query) {
    throw new Error('query cannot be null or empty');
  }
  return client
    .raw(query)
    .stream()
    .on('end', () => client.destroy());
}

export function jsonStreamReader(config: any): stream.Readable {
  let readStream;
  if (config.data) {
    readStream = new stream.Readable();
    readStream.push(JSON.stringify(config.data));
    readStream.push(null);
  } else {
    readStream = fs.createReadStream(config.filePath, { encoding: 'utf-8' });
  }
  return readStream.pipe(JSONStream.parse('*'));
}
