import appConfig from "@config/configs/app.config";
import { ValidationPipe } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AllExceptionFilter } from "@shared/exception-filters";
import { LoggingInterceptor } from "@shared/interceptors/logging.interceptor";
import { configureSwagger } from "@shared/middlewares";
import { ApiGatewayModule } from "./api-gateway.module";

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule, {
    logger: ["warn", "error"],
  });
  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  const port = config.port;

  configureSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new AllExceptionFilter(app.get(HttpAdapterHost)));

  await app.listen(port).then(async () => {
    console.log(`[server] api-gateway is listening at ${await app.getUrl()}`);
  });
}
bootstrap();
