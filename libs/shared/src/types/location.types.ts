import { Types } from "mongoose";
import { BaseMongodbType } from "./base.types";
import { Device } from "./device.types";

export interface Location extends BaseMongodbType {
  deviceId: Types.ObjectId | Device;
  ip: string;
  country?: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
}
