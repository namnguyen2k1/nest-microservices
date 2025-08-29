import { DB_COLLECTION, DB_CONNECTION } from "@database/mongodb/constant";
import { BaseRepositoryAbstract } from "@database/repositories/abstract.repository";
import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { RoleModel } from "../models/role.model";

@Injectable()
export class RoleRepository extends BaseRepositoryAbstract<RoleModel> {
  constructor(
    @InjectModel(DB_COLLECTION.ROLE, DB_CONNECTION.PLAYGROUND)
    readonly model: Model<RoleModel>,

    @InjectConnection(DB_CONNECTION.PLAYGROUND)
    readonly connection: Connection,
  ) {
    super(model, connection);
  }
}
