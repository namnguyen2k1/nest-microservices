import appConfig from "@config/configs/app.config";
import { ConfigType } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { TokenModule } from "./token.module";

async function bootstrap() {
  const app = await NestFactory.create(TokenModule, {
    logger: ["warn", "error"],
  });
  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  const port = config.tokenPort;

  await app.listen(port).then(async () => {
    console.log(`[server] token-service is listening at ${await app.getUrl()}`);
  });
}
bootstrap();
