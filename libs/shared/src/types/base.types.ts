import { Types } from "mongoose";

export interface BaseMongodbType {
  _id: Types.ObjectId;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface BasePostgresqlType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
