import { PickType } from "@nestjs/swagger";
import { CreateRoleBodyDTO } from "./create-role-body.dto";

export class UpdateRoleBodyDTO extends PickType(CreateRoleBodyDTO, ["description", "status"]) {}
