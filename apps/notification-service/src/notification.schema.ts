import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { NotificationModel } from "./notification.model";

export type NotificationDocument = HydratedDocument<NotificationModel>;

export const NotificationSchema = SchemaFactory.createForClass(NotificationModel);

NotificationSchema.loadClass(NotificationModel);

MongodbUtils.customSchemaHooks({ schema: NotificationSchema });
