import { Types } from "mongoose";
import { BaseMongodbType } from "./base.types";
import { Device } from "./device.types";
import { User } from "./user.types";

export interface Token extends BaseMongodbType {
  deviceId: Types.ObjectId | Device;
  userId: Types.ObjectId | User;
  refreshToken: string;
  expiredAt: Date;
  revokedAt?: Date;
}
