import appConfig from "@config/configs/app.config";
import { ConfigType } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { WalletModule } from "./wallet.module";

async function bootstrap() {
  const app = await NestFactory.create(WalletModule, {
    logger: ["warn", "error"],
  });
  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  const port = config.walletPort;

  await app.listen(port).then(async () => {
    console.log(`[server] wallet-service is listening at ${await app.getUrl()}`);
  });
}
bootstrap();
