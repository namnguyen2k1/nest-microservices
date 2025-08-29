import { DB_COLLECTION, DB_CONNECTION } from "@database/mongodb/constant";
import { BaseRepositoryAbstract } from "@database/repositories/abstract.repository";
import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { RolePermission } from "../models/role-permission.model";

@Injectable()
export class RolePermissionRepository extends BaseRepositoryAbstract<RolePermission> {
  constructor(
    @InjectModel(DB_COLLECTION.ROLE_PERMISSION, DB_CONNECTION.PLAYGROUND)
    readonly model: Model<RolePermission>,

    @InjectConnection(DB_CONNECTION.PLAYGROUND)
    readonly connection: Connection,
  ) {
    super(model, connection);
  }
}
