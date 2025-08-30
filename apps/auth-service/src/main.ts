import appConfig from "@config/configs/app.config";
import { ConfigType } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AuthModule } from "./auth.module";

async function bootstrap() {
  const app = await NestFactory.create(AuthModule, {
    logger: ["warn", "error"],
  });
  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  const port = config.authPort;

  await app.listen(port).then(async () => {
    console.log(`[server] auth-service is listening at ${await app.getUrl()}`);
  });
}
bootstrap();
