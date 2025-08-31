import { ConfigurationModule } from "@config/config.module";
import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { SERVICE } from "@shared/constants";
import { RoleProxy } from "@shared/proxy";
import { RoleController } from "./controllers/role.controller";

@Module({
  imports: [
    ConfigurationModule,
    ClientsModule.register([
      {
        name: SERVICE.ROLE,
        transport: Transport.TCP,
        options: { host: "0.0.0.0", port: 4001 },
      },
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleProxy],
})
export class ApiGatewayModule {}
