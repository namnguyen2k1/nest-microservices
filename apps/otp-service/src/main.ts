import { NestFactory } from "@nestjs/core";
import { OtpServiceModule } from "./otp-service.module";

async function bootstrap() {
  const app = await NestFactory.create(OtpServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
