import databaseConfig from '@config/configs/database.config';
import { ConfigType } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { Connection, ConnectionStates } from 'mongoose';

export const createMongoDbConfig = (
  dbConfig: ConfigType<typeof databaseConfig>,
): MongooseModuleFactoryOptions => ({
  uri: dbConfig.mongo.url,
  retryDelay: 1,
  retryAttempts: 1,
  connectionFactory: async (conn: Connection) => {
    // conn.plugin(); // config mongoose plugins
    if (conn.readyState === ConnectionStates.connected) {
      const { url, database } = dbConfig.mongo;
      console.log(`[database] (mongodb) connected to "${database}" at ${url}`);
    }
    return conn;
  },
});
