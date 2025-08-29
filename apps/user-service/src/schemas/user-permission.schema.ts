import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserPermissionModel } from "../models/user-permission.model";

export type UserPermissionDocument = HydratedDocument<UserPermissionModel>;

export const UserPermissionSchema = SchemaFactory.createForClass(UserPermissionModel);

UserPermissionSchema.loadClass(UserPermissionModel);

MongodbUtils.customSchemaHooks({ schema: UserPermissionSchema });
