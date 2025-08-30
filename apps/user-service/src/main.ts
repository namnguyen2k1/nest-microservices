import appConfig from "@config/configs/app.config";
import { ConfigType } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { UserModule } from "./user.module";

async function bootstrap() {
  const app = await NestFactory.create(UserModule, {
    logger: ["warn", "error"],
  });
  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  const port = config.userPort;

  await app.listen(port).then(async () => {
    console.log(`[server] user-service is listening at ${await app.getUrl()}`);
  });
}
bootstrap();
