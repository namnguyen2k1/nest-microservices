import databaseConfig from '@config/configs/database.config';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const createPostgresqlConfig = (
  dbConfig: ConfigType<typeof databaseConfig>,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  url: dbConfig.postgres.url,
  database: dbConfig.postgres.database,
  synchronize: dbConfig.env === 'development',
  autoLoadEntities: true,
  retryAttempts: 1,
  retryDelay: 1000,
  // logging: dbConfig.env === "development",
});
