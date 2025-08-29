import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { PermissionModel } from "../models/permission.model";

export type PermissionDocument = HydratedDocument<PermissionModel>;

export const PermissionSchema = SchemaFactory.createForClass(PermissionModel);

PermissionSchema.loadClass(PermissionModel);

MongodbUtils.customSchemaHooks({ schema: PermissionSchema });
