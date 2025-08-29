import { DB_COLLECTION } from "@database/mongodb/constant";
import { BaseModel } from "@database/mongodb/models/base.model";
import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { Prop, Schema } from "@nestjs/mongoose";
import { Device, DEVICE_STATUS, User } from "@shared/types";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

@Schema(
  MongodbUtils.createSchemaOptions({
    collection: DB_COLLECTION.DEVICE,
  }),
)
export class DeviceModel extends BaseModel implements Device {
  @Prop({
    type: Types.ObjectId,
    ref: DB_COLLECTION.USER,
    required: true,
  })
  userId: Types.ObjectId | User;

  @Prop({ required: true })
  @IsString()
  ip: string;

  @Prop()
  @IsOptional()
  @IsString()
  deviceType?: string;

  @Prop()
  @IsOptional()
  @IsString()
  deviceName?: string;

  @Prop()
  @IsOptional()
  @IsString()
  os?: string;

  @Prop()
  @IsOptional()
  @IsString()
  browser?: string;

  @Prop()
  @IsOptional()
  @IsString()
  browserVersion?: string;

  @Prop()
  @IsOptional()
  @IsString()
  userAgent?: string;

  @Prop({
    type: String,
    enum: DEVICE_STATUS,
    default: DEVICE_STATUS.INACTIVE,
  })
  @IsOptional()
  @IsEnum(DEVICE_STATUS)
  status?: DEVICE_STATUS;

  @Prop({})
  @IsString()
  @IsOptional()
  lastLogin?: Date;
}
