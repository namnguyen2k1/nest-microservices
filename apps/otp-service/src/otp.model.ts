import { DB_COLLECTION } from "@database/mongodb/constant";
import { BaseModel } from "@database/mongodb/models/base.model";
import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { Prop, Schema } from "@nestjs/mongoose";
import { OTP, OTP_TYPE, User } from "@shared/types";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

@Schema(
  MongodbUtils.createSchemaOptions({
    collection: DB_COLLECTION.OTP,
  }),
)
export class OTPModel extends BaseModel implements OTP {
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
