import { DB_COLLECTION } from "@database/mongodb/constant";
import { BaseModel } from "@database/mongodb/models/base.model";
import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { Prop, Schema } from "@nestjs/mongoose";
import { Device, Location } from "@shared/types";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

@Schema(
  MongodbUtils.createSchemaOptions({
    collection: DB_COLLECTION.LOCATION,
  }),
)
export class LocationModel extends BaseModel implements Location {
  @Prop({
    type: Types.ObjectId,
    ref: DB_COLLECTION.DEVICE,
    required: true,
  })
  deviceId: Types.ObjectId | Device;

  @Prop({ required: true })
  @IsString()
  ip: string;

  @Prop({})
  @IsOptional()
  @IsString()
  country?: string;

  @Prop({})
  @IsOptional()
  @IsString()
  region?: string;

  @Prop({})
  @IsOptional()
  @IsString()
  city?: string;

  @Prop({})
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @Prop({})
  @IsOptional()
  @IsNumber()
  longitude?: number;
}
