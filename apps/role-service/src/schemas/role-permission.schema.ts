import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { RolePermission } from "../models/role-permission.model";

export type RolePermissionDocument = HydratedDocument<RolePermission>;

export const RolePermissionSchema = SchemaFactory.createForClass(RolePermission);

RolePermissionSchema.loadClass(RolePermission);

MongodbUtils.customSchemaHooks({ schema: RolePermissionSchema });
