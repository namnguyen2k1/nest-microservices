import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Profile } from "../models/profile.model";

export type ProfileDocument = HydratedDocument<Profile>;

export const ProfileSchema = SchemaFactory.createForClass(Profile);

ProfileSchema.loadClass(Profile);

MongodbUtils.customSchemaHooks({ schema: ProfileSchema });
