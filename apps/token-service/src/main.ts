import { NestFactory } from "@nestjs/core";
import { TokenModule } from "./token.module";

async function bootstrap() {
  const app = await NestFactory.create(TokenModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
