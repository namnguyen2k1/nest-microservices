import appConfig from "@config/configs/app.config";
import { DB_COLLECTION, DB_CONNECTION } from "@database/mongodb/constant";
import { MongodbModule } from "@database/mongodb/mongodb.module";
import { Inject, Module, OnModuleInit } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { NotificationController } from "./notification.controller";
import { NotificationRepository } from "./notification.repository";
import { NotificationSchema } from "./notification.schema";
import { NotificationService } from "./services/notification.service";
import { SseService } from "./services/sse.service";

@Module({
  imports: [
    MongodbModule,
    MongooseModule.forFeature(
      [
        {
          name: DB_COLLECTION.NOTIFICATION,
          schema: NotificationSchema,
        },
      ],
      DB_CONNECTION.PLAYGROUND,
    ),
    //
  ],
  controllers: [NotificationController],
  providers: [NotificationRepository, SseService, NotificationService],
  exports: [NotificationService],
})
export class NotificationModule implements OnModuleInit {
  constructor(
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>,
  ) {}

  onModuleInit() {
    const { url } = this.config;
    console.log(`[sse] stream is listening at: ${url}/global-stream`);
  }
}
