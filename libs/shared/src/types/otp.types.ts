import { Types } from "mongoose";
import { BaseMongodbType } from "./base.types";
import { User } from "./user.types";

export enum OTP_TYPE {
  VERIFY_2FA = "OTP_TYPE_VERIFY_2FA",
  VERIFY_REGISTER = "OTP_TYPE_VERIFY_REGISTER",
  VERIFY_DEVICE = "OTP_TYPE_VERIFY_DEVICE",
  VERIFY_FORGOT_PASSWORD = "OTP_TYPE_VERIFY_FORGOT_PASSWORD",
  VERIFY_CHANGE_PASSWORD = "OTP_TYPE_VERIFY_CHANGE_PASSWORD",
}

export interface OTP extends BaseMongodbType {
  userId: Types.ObjectId | User;
  type: OTP_TYPE;
  code: number;
  expiredAt: Date;
  usedAt?: Date;
}
