import { Types } from "mongoose";
import { BaseMongodbType } from "./base.types";
import { Permission } from "./permission.types";
import { Role } from "./role.types";

export interface RolePermission extends BaseMongodbType {
  roleId: Types.ObjectId | Role;
  permissionId: Types.ObjectId | Permission;
}
