import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Permission } from "../models/permission.model";

export type PermissionDocument = HydratedDocument<Permission>;

export const PermissionSchema = SchemaFactory.createForClass(Permission);

PermissionSchema.loadClass(Permission);

MongodbUtils.customSchemaHooks({ schema: PermissionSchema });
