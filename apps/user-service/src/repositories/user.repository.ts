import { DB_COLLECTION, DB_CONNECTION } from "@database/mongodb/constant";
import { BaseRepositoryAbstract } from "@database/repositories/abstract.repository";
import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { UserModel } from "../models/user.model";

@Injectable()
export class UserRepository extends BaseRepositoryAbstract<UserModel> {
  constructor(
    @InjectModel(DB_COLLECTION.USER, DB_CONNECTION.PLAYGROUND)
    readonly model: Model<UserModel>,

    @InjectConnection(DB_CONNECTION.PLAYGROUND)
    readonly connection: Connection,
  ) {
    super(model, connection);
  }
}
