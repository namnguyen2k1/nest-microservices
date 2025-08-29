import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserModel } from "../models/user.model";

export type UserDocument = HydratedDocument<UserModel>;

export const UserSchema = SchemaFactory.createForClass(UserModel);

UserSchema.loadClass(UserModel);

MongodbUtils.customSchemaHooks({ schema: UserSchema });
