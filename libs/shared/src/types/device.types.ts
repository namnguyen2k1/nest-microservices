import { Types } from "mongoose";
import { BaseMongodbType } from "./base.types";
import { User } from "./user.types";

export enum DEVICE_STATUS {
  ACTIVE = "DEVICE_STATUS_ACTIVE",
  INACTIVE = "DEVICE_STATUS_INACTIVE",
  BLOCK = "DEVICE_STATUS_BLOCK",
}

export interface Device extends BaseMongodbType {
  userId: Types.ObjectId | User;
  ip: string;
  deviceType?: string;
  deviceName?: string;
  os?: string;
  browser?: string;
  browserVersion?: string;
  userAgent?: string;
  status?: DEVICE_STATUS;
  lastLogin?: Date;
}
