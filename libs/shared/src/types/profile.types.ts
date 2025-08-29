import { Types } from "mongoose";
import { BaseMongodbType } from "./base.types";
import { User } from "./user.types";

export interface Profile extends BaseMongodbType {
  userId: Types.ObjectId | User;
  avatarUrl: string;
  coverUrl?: string;
}
