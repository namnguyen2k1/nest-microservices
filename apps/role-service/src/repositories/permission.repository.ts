import { DB_COLLECTION, DB_CONNECTION } from "@database/mongodb/constant";
import { BaseRepositoryAbstract } from "@database/repositories/abstract.repository";
import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { PermissionModel } from "../models/permission.model";

@Injectable()
export class PermissionRepository extends BaseRepositoryAbstract<PermissionModel> {
  constructor(
    @InjectModel(DB_COLLECTION.PERMISSION, DB_CONNECTION.PLAYGROUND)
    readonly model: Model<PermissionModel>,

    @InjectConnection(DB_CONNECTION.PLAYGROUND)
    readonly connection: Connection,
  ) {
    super(model, connection);
  }
}
