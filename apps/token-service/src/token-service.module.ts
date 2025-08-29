import { Module } from "@nestjs/common";
import { TokenServiceController } from "./token-service.controller";
import { TokenServiceService } from "./token-service.service";

@Module({
  imports: [],
  controllers: [TokenServiceController],
  providers: [TokenServiceService],
})
export class TokenServiceModule {}
