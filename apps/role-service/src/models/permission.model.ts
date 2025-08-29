import { DB_COLLECTION } from "@database/mongodb/constant";
import { BaseModel } from "@database/mongodb/models/base.model";
import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { Prop, Schema } from "@nestjs/mongoose";
import { Permission, PERMISSION_KEY } from "@shared/types";
import { IsEnum, IsOptional, IsString } from "class-validator";

@Schema(
  MongodbUtils.createSchemaOptions({
    collection: DB_COLLECTION.PERMISSION,
  }),
)
export class PermissionModel extends BaseModel implements Permission {
  @Prop({
    type: String,
    enum: PERMISSION_KEY,
    unique: true,
    required: true,
  })
  @IsEnum(PERMISSION_KEY)
  key: PERMISSION_KEY;

  @Prop({})
  @IsString()
  @IsOptional()
  description: string;
}
