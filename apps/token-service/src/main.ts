import { NestFactory } from "@nestjs/core";
import { TokenServiceModule } from "./token-service.module";

async function bootstrap() {
  const app = await NestFactory.create(TokenServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
