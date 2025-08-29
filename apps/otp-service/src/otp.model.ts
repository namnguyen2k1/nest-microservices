import { DB_COLLECTION } from "@database/mongodb/constant";
import { BaseModel } from "@database/mongodb/models/base.model";
import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { Prop, Schema } from "@nestjs/mongoose";
import { User } from "apps/user-service/src/models/user.model";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export enum OTP_TYPE {
  VERIFY_2FA = "OTP_TYPE_VERIFY_2FA",
  VERIFY_REGISTER = "OTP_TYPE_VERIFY_REGISTER",
  VERIFY_DEVICE = "OTP_TYPE_VERIFY_DEVICE",
  VERIFY_FORGOT_PASSWORD = "OTP_TYPE_VERIFY_FORGOT_PASSWORD",
  VERIFY_CHANGE_PASSWORD = "OTP_TYPE_VERIFY_CHANGE_PASSWORD",
}

@Schema(
  MongodbUtils.createSchemaOptions({
    collection: DB_COLLECTION.OTP,
  }),
)
export class OTP extends BaseModel {
  @Prop({
    type: Types.ObjectId,
    ref: DB_COLLECTION.USER,
    required: true,
  })
  userId: Types.ObjectId | User;

  @Prop({
    type: String,
    enum: OTP_TYPE,
    required: true,
  })
  @IsEnum(OTP_TYPE)
  type: OTP_TYPE;

  @Prop({ required: true })
  @IsNumber()
  code: number;

  @Prop({ required: true })
  @IsString()
  expiredAt: Date;

  @Prop({})
  @IsString()
  @IsOptional()
  usedAt?: Date;
}
