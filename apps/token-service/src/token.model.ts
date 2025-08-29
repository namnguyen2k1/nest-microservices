import { DB_COLLECTION } from "@database/mongodb/constant";
import { BaseModel } from "@database/mongodb/models/base.model";
import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { Prop, Schema } from "@nestjs/mongoose";
import { Device } from "apps/device-service/src/models/device.model";
import { User } from "apps/user-service/src/models/user.model";
import { IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

@Schema(
  MongodbUtils.createSchemaOptions({
    collection: DB_COLLECTION.TOKEN,
  }),
)
export class Token extends BaseModel {
  @Prop({
    type: Types.ObjectId,
    ref: DB_COLLECTION.DEVICE,
    required: true,
  })
  deviceId: Types.ObjectId | Device;

  @Prop({
    type: Types.ObjectId,
    ref: DB_COLLECTION.USER,
    required: true,
  })
  userId: Types.ObjectId | User;

  @Prop({ required: true })
  @IsString()
  refreshToken: string;

  @Prop({ required: true })
  @IsString()
  expiredAt: Date;

  @Prop({})
  @IsString()
  @IsOptional()
  revokedAt?: Date;
}
