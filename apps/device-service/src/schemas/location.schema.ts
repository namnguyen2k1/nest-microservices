import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Location } from "../models/location.model";

export type LocationDocument = HydratedDocument<Location>;

export const LocationSchema = SchemaFactory.createForClass(Location);

LocationSchema.loadClass(Location);

MongodbUtils.customSchemaHooks({ schema: LocationSchema });
