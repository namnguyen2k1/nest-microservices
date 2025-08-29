import { PERMISSION_KEY } from "apps/role-service/src/models/permission.model";
import { ROLE_KEY } from "apps/role-service/src/models/role.model";
import { User } from "apps/user-service/src/models/user.model";
import { Request } from "express";

export interface AuthContext {
  roleKey: ROLE_KEY;
  user: User;
  permissions: PERMISSION_KEY[];
}

export interface AuthorizedRequest extends Request {
  authContext: AuthContext;
}
