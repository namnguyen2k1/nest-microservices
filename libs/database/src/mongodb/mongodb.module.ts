import { ConfigurationModule } from '@config/config.module';
import databaseConfig from '@config/configs/database.config';
import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { createMongoDbConfig } from './config-database';
import { DB_CONNECTION } from './constant';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [databaseConfig.KEY],
      useFactory: createMongoDbConfig,
      connectionName: DB_CONNECTION.PLAYGROUND,
    }),
  ],
})
export class MongodbModule implements OnModuleInit {
  onModuleInit() {
    mongoose.set('runValidators', true);
    mongoose.set('strictQuery', true);
    mongoose.set('debug', true);
  }
}
