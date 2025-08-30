import appConfig from "@config/configs/app.config";
import { ConfigType } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { ApiGatewayModule } from "./api-gateway.module";

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule, {
    logger: ["warn", "error"],
  });
  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  const port = config.port;

  await app.listen(port).then(async () => {
    console.log(`[server] api-gateway is listening at ${await app.getUrl()}`);
  });
}
bootstrap();
