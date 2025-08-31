import { PickType } from "@nestjs/swagger";
import { CreateRoleBody, CreateRoleBodyDTO } from "./create-role.dto";

export interface UpdateRoleBody extends Pick<CreateRoleBody, "description" | "status"> {}

export class UpdateRoleBodyDTO
  extends PickType(CreateRoleBodyDTO, ["description", "status"])
  implements UpdateRoleBody {}
