import { Controller, Get } from "@nestjs/common";
import { OtpServiceService } from "./otp-service.service";

@Controller()
export class OtpServiceController {
  constructor(private readonly otpServiceService: OtpServiceService) {}

  @Get()
  getHello(): string {
    return this.otpServiceService.getHello();
  }
}
