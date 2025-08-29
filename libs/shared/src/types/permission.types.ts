import { BaseMongodbType } from "./base.types";

export enum PERMISSION_KEY {
  // === User Module ===
  USER_READ = "USER_READ",
  USER_CREATE = "USER_CREATE",
  USER_UPDATE = "USER_UPDATE",
  USER_DELETE = "USER_DELETE",

  // === Role Module ===
  ROLE_READ = "ROLE_READ",
  ROLE_CREATE = "ROLE_CREATE",
  ROLE_UPDATE = "ROLE_UPDATE",
  ROLE_DELETE = "ROLE_DELETE",

  // === Post Module ===
  POST_READ = "POST_READ",
  POST_CREATE = "POST_CREATE",
  POST_UPDATE = "POST_UPDATE",
  POST_DELETE = "POST_DELETE",
}

export interface Permission extends BaseMongodbType {
  key: PERMISSION_KEY;
  description: string;
}
