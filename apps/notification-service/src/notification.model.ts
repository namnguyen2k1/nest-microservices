import { DB_COLLECTION } from "@database/mongodb/constant";
import { BaseModel } from "@database/mongodb/models/base.model";
import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { Prop, Schema } from "@nestjs/mongoose";
import { Notification, NOTIFICATION_STATUS, NOTIFICATION_TYPE, User } from "@shared/types";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

@Schema(
  MongodbUtils.createSchemaOptions({
    collection: DB_COLLECTION.NOTIFICATION,
  }),
)
export class NotificationModel extends BaseModel implements Notification {
  @Prop({
    type: Types.ObjectId,
    ref: DB_COLLECTION.USER,
    required: true,
  })
  userId: Types.ObjectId | User;

  @Prop({
    type: String,
    enum: NOTIFICATION_TYPE,
    required: true,
  })
  @IsEnum(NOTIFICATION_TYPE)
  type: NOTIFICATION_TYPE;

  @Prop({ required: true })
  @IsString()
  title: string;

  @Prop({ required: true })
  @IsString()
  description: string;

  @Prop({
    type: String,
    enum: NOTIFICATION_STATUS,
    default: NOTIFICATION_STATUS.UNREAD,
  })
  @IsEnum(NOTIFICATION_STATUS)
  status: NOTIFICATION_STATUS;

  @Prop({})
  @IsString()
  @IsOptional()
  readAt?: Date;
}
