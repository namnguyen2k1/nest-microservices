import { DB_COLLECTION } from "@database/mongodb/constant";
import { BaseModel } from "@database/mongodb/models/base.model";
import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { Prop, Schema } from "@nestjs/mongoose";
import { Role, ROLE_KEY, ROLE_STATUS } from "@shared/types";
import { IsEnum, IsNumber, IsString } from "class-validator";

@Schema(
  MongodbUtils.createSchemaOptions({
    collection: DB_COLLECTION.ROLE,
  }),
)
export class RoleModel extends BaseModel implements Role {
  @Prop({
    type: String,
    enum: ROLE_KEY,
    unique: true,
    required: true,
  })
  @IsEnum(ROLE_KEY)
  key: ROLE_KEY;

  @Prop({ required: true })
  @IsString()
  description: string;

  @Prop({ required: true })
  @IsNumber()
  maxDeviceLogin: number;

  @Prop({
    type: String,
    enum: ROLE_STATUS,
    default: ROLE_STATUS.ACTIVE,
  })
  @IsEnum(ROLE_STATUS)
  status: ROLE_STATUS;
}
