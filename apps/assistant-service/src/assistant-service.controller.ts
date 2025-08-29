import { Controller, Get } from '@nestjs/common';
import { AssistantServiceService } from './assistant-service.service';

@Controller()
export class AssistantServiceController {
  constructor(
    private readonly assistantServiceService: AssistantServiceService,
  ) {}

  @Get()
  getHello(): string {
    return this.assistantServiceService.getHello();
  }
}
