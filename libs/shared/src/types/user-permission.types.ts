import { Types } from "mongoose";
import { BaseMongodbType } from "./base.types";
import { Permission } from "./permission.types";
import { User } from "./user.types";

export interface UserPermission extends BaseMongodbType {
  userId: Types.ObjectId | User;
  permissionId: Types.ObjectId | Permission;
}
