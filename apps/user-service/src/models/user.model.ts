import { DB_COLLECTION } from "@database/mongodb/constant";
import { BaseModel } from "@database/mongodb/models/base.model";
import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { Prop, Schema } from "@nestjs/mongoose";
import { Role } from "@shared/types";
import { User, USER_STATUS } from "@shared/types/user.types";
import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

@Schema(
  MongodbUtils.createSchemaOptions({
    collection: DB_COLLECTION.USER,
  }),
)
export class UserModel extends BaseModel implements User {
  @Prop({ type: Types.ObjectId, ref: DB_COLLECTION.ROLE, required: true })
  roleId: Types.ObjectId | Role;

  @Prop({ required: true, unique: true })
  @IsEmail()
  email: string;

  @Prop({ required: true })
  @IsString()
  name: string;

  @Prop({ required: true })
  @IsString()
  password: string;

  @Prop()
  @IsOptional()
  @IsString()
  phone?: string;

  @Prop({
    type: String,
    enum: USER_STATUS,
    default: USER_STATUS.VERIFYING,
  })
  @IsEnum(USER_STATUS)
  status: USER_STATUS;

  @Prop({ default: false })
  @IsString()
  enable2FA: boolean;

  @Prop({})
  @IsString()
  @IsOptional()
  lastLogin?: Date;
}
