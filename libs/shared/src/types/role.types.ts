import { BaseMongodbType } from "./base.types";

export enum ROLE_KEY {
  ADMIN = "ROLE_KEY_ADMIN",
  CLIENT = "ROLE_KEY_CLIENT",
}

export enum ROLE_STATUS {
  ACTIVE = "ROLE_STATUS_ACTIVE",
  INACTIVE = "ROLE_STATUS_INACTIVE",
}

export interface Role extends BaseMongodbType {
  key: ROLE_KEY;
  description: string;
  maxDeviceLogin: number;
  status: ROLE_STATUS;
}
