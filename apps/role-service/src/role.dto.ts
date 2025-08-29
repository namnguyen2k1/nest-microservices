import { ApiProperty, PickType } from "@nestjs/swagger";
import { PagingDTO } from "@shared/index";
import { IsEnum, IsString, MaxLength } from "class-validator";
import { ROLE_KEY, ROLE_STATUS } from "./models/role.model";

export class GetRolesBodyDTO extends PagingDTO {}

export class CreateRoleBodyDTO {
  @ApiProperty({
    description: "Role name",
    enum: ROLE_KEY,
    example: ROLE_KEY.CLIENT,
  })
  @IsEnum(ROLE_KEY)
  name: ROLE_KEY;

  @ApiProperty({
    description: "Description of the role",
    example: "Has full administrative access",
  })
  @IsString()
  @MaxLength(500)
  description: string;

  @ApiProperty({
    description: "Role status",
    enum: ROLE_STATUS,
    example: ROLE_STATUS.ACTIVE,
  })
  @IsEnum(ROLE_STATUS)
  status: ROLE_STATUS;
}

export class UpdateRoleBodyDTO extends PickType(CreateRoleBodyDTO, ["description", "status"]) {}
