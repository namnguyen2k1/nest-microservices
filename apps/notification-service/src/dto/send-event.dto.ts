import { ApiProperty } from "@nestjs/swagger";
import { SSE_TYPE } from "@shared/types";
import { IsEnum, IsNotEmpty } from "class-validator";

export class SendEventDto {
  @ApiProperty({
    description: "Data attached to the event",
    example: { msg: "System maintenance at 23:00" },
  })
  @IsNotEmpty()
  data: any;

  @ApiProperty({
    description: "Type of SSE event",
    enum: SSE_TYPE,
    example: SSE_TYPE.SYSTEM,
  })
  @IsEnum(SSE_TYPE)
  type: SSE_TYPE;
}
