import appConfig from "@config/configs/app.config";
import { ConfigType } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { OtpModule } from "./otp.module";

async function bootstrap() {
  const app = await NestFactory.create(OtpModule, {
    logger: ["warn", "error"],
  });
  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  const port = config.otpPort;

  await app.listen(port).then(async () => {
    console.log(`[server] otp-service is listening at ${await app.getUrl()}`);
  });
}
bootstrap();
