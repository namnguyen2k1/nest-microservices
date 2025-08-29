import { NestFactory } from "@nestjs/core";
import { RoleServiceModule } from "./role-service.module";

async function bootstrap() {
  const app = await NestFactory.create(RoleServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
