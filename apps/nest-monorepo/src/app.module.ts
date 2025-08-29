import { CachingModule } from "@cache/caching.module";
import { DatabaseModule } from "@database/database.module";
import { MailModule } from "@mail/mail.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [DatabaseModule, CachingModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
