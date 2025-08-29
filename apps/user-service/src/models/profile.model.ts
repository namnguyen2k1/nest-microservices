import { DB_COLLECTION } from "@database/mongodb/constant";
import { BaseModel } from "@database/mongodb/models/base.model";
import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { Prop, Schema } from "@nestjs/mongoose";
import { Profile, User } from "@shared/types";
import { IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

@Schema(
  MongodbUtils.createSchemaOptions({
    collection: DB_COLLECTION.PROFILE,
  }),
)
export class ProfileModel extends BaseModel implements Profile {
  @Prop({
    type: Types.ObjectId,
    ref: DB_COLLECTION.USER,
    required: true,
  })
  userId: Types.ObjectId | User;

  @Prop({ required: true })
  @IsString()
  avatarUrl: string;

  @Prop({})
  @IsString()
  @IsOptional()
  coverUrl?: string;
}
