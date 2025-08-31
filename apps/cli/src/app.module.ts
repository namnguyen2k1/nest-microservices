import { Module } from "@nestjs/common";
import { StartServiceCommand } from "./commands/start-service.command";

@Module({
  providers: [StartServiceCommand],
})
export class AppModule {}
