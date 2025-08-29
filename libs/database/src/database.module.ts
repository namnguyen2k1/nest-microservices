import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { MongodbModule } from './mongodb/mongodb.module';
import { PostgreSQLModule } from './postgresql/postgresql.module';

@Module({
  imports: [MongodbModule, PostgreSQLModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
