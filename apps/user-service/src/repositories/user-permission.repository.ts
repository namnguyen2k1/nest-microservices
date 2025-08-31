import { DB_COLLECTION, DB_CONNECTION } from "@database/mongodb/constant";
import { BaseMongodbRepository } from "@database/repositories/base-mongodb.repository";
import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { UserPermissionModel } from "../models/user-permission.model";

@Injectable()
export class UserPermissionRepository extends BaseMongodbRepository<UserPermissionModel> {
  constructor(
    @InjectModel(DB_COLLECTION.USER_PERMISSION, DB_CONNECTION.PLAYGROUND)
    readonly model: Model<UserPermissionModel>,

    @InjectConnection(DB_CONNECTION.PLAYGROUND)
    readonly connection: Connection,
  ) {
    super(model, connection);
  }
}
