import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { LocationModel } from "../models/location.model";

export type LocationDocument = HydratedDocument<LocationModel>;

export const LocationSchema = SchemaFactory.createForClass(LocationModel);

LocationSchema.loadClass(LocationModel);

MongodbUtils.customSchemaHooks({ schema: LocationSchema });
