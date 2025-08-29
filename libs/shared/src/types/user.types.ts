import { Types } from "mongoose";
import { BaseMongodbType } from "./base.types";
import { Role } from "./role.types";

export enum USER_STATUS {
  ACTIVE = "USER_STATUS_ACTIVE",
  VERIFYING = "USER_STATUS_VERIFYING",
  BLOCK = "USER_STATUS_BLOCK",
}

export interface User extends BaseMongodbType {
  roleId: Types.ObjectId | Role;
  email: string;
  name: string;
  password: string;
  phone?: string;
  status: USER_STATUS;
  enable2FA: boolean;
  lastLogin?: Date;
}
