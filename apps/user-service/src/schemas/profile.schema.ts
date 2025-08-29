import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ProfileModel } from "../models/profile.model";

export type ProfileDocument = HydratedDocument<ProfileModel>;

export const ProfileSchema = SchemaFactory.createForClass(ProfileModel);

ProfileSchema.loadClass(ProfileModel);

MongodbUtils.customSchemaHooks({ schema: ProfileSchema });
