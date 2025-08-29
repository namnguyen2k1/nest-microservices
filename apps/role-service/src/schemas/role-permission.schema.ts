import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { RolePermissionModel } from "../models/role-permission.model";

export type RolePermissionDocument = HydratedDocument<RolePermissionModel>;

export const RolePermissionSchema = SchemaFactory.createForClass(RolePermissionModel);

RolePermissionSchema.loadClass(RolePermissionModel);

MongodbUtils.customSchemaHooks({ schema: RolePermissionSchema });
