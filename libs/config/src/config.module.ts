import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import aiConfig from './configs/ai.config';
import appConfig from './configs/app.config';
import authConfig from './configs/auth.config';
import cacheConfig from './configs/cache.config';
import databaseConfig from './configs/database.config';
import mailConfig from './configs/mail.config';
import swaggerConfig from './configs/swagger.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      load: [
        appConfig,
        databaseConfig,
        swaggerConfig,
        authConfig,
        cacheConfig,
        mailConfig,
        aiConfig,
      ],
    }),
  ],
})
export class ConfigModule {}
