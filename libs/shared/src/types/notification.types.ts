import { Types } from "mongoose";
import { BaseMongodbType } from "./base.types";
import { User } from "./user.types";

export enum NOTIFICATION_TYPE {
  USER_EVENT = "NOTIFICATION_TYPE_USER_EVENT",
  SYSTEM_EVENT = "NOTIFICATION_TYPE_SYSTEM_EVENT",
}

export enum NOTIFICATION_STATUS {
  UNREAD = "NOTIFICATION_STATUS_UNREAD",
  READ = "NOTIFICATION_STATUS_READ",
  ARCHIVED = "NOTIFICATION_STATUS_ARCHIVED",
  DELETED = "NOTIFICATION_STATUS_DELETED",
}

export enum SSE_TYPE {
  NOTIFICATION = "NOTIFICATION",
  SYSTEM = "SYSTEM",
  HEARTBEAT = "HEARTBEAT",
  MAINTENANCE = "MAINTENANCE",
}

export interface SsePayload {
  readonly type: SSE_TYPE;
  readonly userId?: string;
  readonly data?: any;
  readonly timestamp?: number | string;
}

export interface Notification extends BaseMongodbType {
  userId: Types.ObjectId | User;
  type: NOTIFICATION_TYPE;
  title: string;
  description: string;
  status: NOTIFICATION_STATUS;
  readAt?: Date;
}
