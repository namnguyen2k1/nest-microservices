import appConfig from "@config/configs/app.config";
import { ConfigType } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DeviceModule } from "./device.module";

async function bootstrap() {
  const app = await NestFactory.create(DeviceModule, {
    logger: ["warn", "error"],
  });
  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  const port = config.devicePort;

  await app.listen(port).then(async () => {
    console.log(`[server] device-service is listening at ${await app.getUrl()}`);
  });
}
bootstrap();
