import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { HttpToRpcExceptionFilter } from "@shared/exception-filters";
import { RoleModule } from "./role.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(RoleModule, {
    transport: Transport.TCP,
    options: { host: "0.0.0.0", port: 4001 },
    logger: ["warn", "error"],
  });
  app.status.subscribe((status) => {
    console.log("[microservice] role-service status:", status);
  });

  app.useGlobalFilters(new HttpToRpcExceptionFilter());

  await app.listen();
}
bootstrap();
