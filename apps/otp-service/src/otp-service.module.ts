import { Module } from "@nestjs/common";
import { OtpServiceController } from "./otp-service.controller";
import { OtpServiceService } from "./otp-service.service";

@Module({
  imports: [],
  controllers: [OtpServiceController],
  providers: [OtpServiceService],
})
export class OtpServiceModule {}
