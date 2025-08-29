import { PERMISSION_KEY, ROLE_KEY, User } from "@shared/types";
import { Request } from "express";

export interface AuthContext {
  roleKey: ROLE_KEY;
  user: User;
  permissions: PERMISSION_KEY[];
}

export interface AuthorizedRequest extends Request {
  authContext: AuthContext;
}
