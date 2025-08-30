import { Module } from "@nestjs/common";
import { BasicCommand } from "./cli.command";

@Module({
  providers: [BasicCommand],
})
export class CliModule {}
