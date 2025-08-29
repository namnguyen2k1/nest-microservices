import { NestFactory } from "@nestjs/core";
import { AssistantServiceModule } from "./assistant-service.module";

async function bootstrap() {
  const app = await NestFactory.create(AssistantServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
