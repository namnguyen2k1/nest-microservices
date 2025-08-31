import { DB_COLLECTION, DB_CONNECTION } from "@database/mongodb/constant";
import { BaseMongodbRepository } from "@database/repositories/base-mongodb.repository";
import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { TokenModel } from "./token.model";

@Injectable()
export class TokenRepository extends BaseMongodbRepository<TokenModel> {
  constructor(
    @InjectModel(DB_COLLECTION.TOKEN, DB_CONNECTION.PLAYGROUND)
    readonly model: Model<TokenModel>,

    @InjectConnection(DB_CONNECTION.PLAYGROUND)
    readonly connection: Connection,
  ) {
    super(model, connection);
  }
}
