import { ConfigurationModule } from "@config/config.module";
import { Module } from "@nestjs/common";
import { ApiGatewayService } from "./api-gateway.service";
import { RoleController } from "./controllers/role.controller";

@Module({
  imports: [ConfigurationModule],
  controllers: [RoleController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
