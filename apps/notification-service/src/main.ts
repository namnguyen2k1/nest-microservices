import appConfig from "@config/configs/app.config";
import { ConfigType } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NotificationModule } from "./notification.module";

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule, {
    logger: ["warn", "error"],
  });
  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  const port = config.notificationPort;

  await app.listen(port).then(async () => {
    console.log(`[server] notification-service is listening at ${await app.getUrl()}`);
  });
}
bootstrap();
