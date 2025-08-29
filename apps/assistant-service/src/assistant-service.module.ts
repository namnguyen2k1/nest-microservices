import { Module } from "@nestjs/common";
import { AssistantServiceController } from "./assistant-service.controller";
import { AssistantServiceService } from "./assistant-service.service";

@Module({
  imports: [],
  controllers: [AssistantServiceController],
  providers: [AssistantServiceService],
})
export class AssistantServiceModule {}
