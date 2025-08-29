import { ConfigurationModule } from '@config/config.module';
import databaseConfig from '@config/configs/database.config';
import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { createPostgresqlConfig } from './postgresql-config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [databaseConfig.KEY],
      useFactory: createPostgresqlConfig,
    }),
  ],
})
export class PostgreSQLModule implements OnModuleInit {
  constructor(
    @Inject(databaseConfig.KEY)
    private readonly dbConfig: ConfigType<typeof databaseConfig>,
    private readonly dataSource: DataSource,
  ) {}

  onModuleInit() {
    if (this.dataSource.isInitialized) {
      const { url, database } = this.dbConfig.postgres;
      console.log(
        `[database] (postgresql) connected to "${database}" at ${url}`,
      );
    }
  }
}
