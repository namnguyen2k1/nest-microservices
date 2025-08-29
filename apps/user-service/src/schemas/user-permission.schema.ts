import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserPermission } from "../models/user-permission.model";

export type UserPermissionDocument = HydratedDocument<UserPermission>;

export const UserPermissionSchema = SchemaFactory.createForClass(UserPermission);

UserPermissionSchema.loadClass(UserPermission);

MongodbUtils.customSchemaHooks({ schema: UserPermissionSchema });
