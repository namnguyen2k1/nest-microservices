import { Controller, Get } from "@nestjs/common";
import { TokenServiceService } from "./token-service.service";

@Controller()
export class TokenServiceController {
  constructor(private readonly tokenServiceService: TokenServiceService) {}

  @Get()
  getHello(): string {
    return this.tokenServiceService.getHello();
  }
}
