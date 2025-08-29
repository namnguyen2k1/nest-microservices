import { DB_COLLECTION, DB_CONNECTION } from "@database/mongodb/constant";
import { BaseRepositoryAbstract } from "@database/repositories/abstract.repository";
import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { TokenModel } from "./token.model";

@Injectable()
export class TokenRepository extends BaseRepositoryAbstract<TokenModel> {
  constructor(
    @InjectModel(DB_COLLECTION.TOKEN, DB_CONNECTION.PLAYGROUND)
    readonly model: Model<TokenModel>,

    @InjectConnection(DB_CONNECTION.PLAYGROUND)
    readonly connection: Connection,
  ) {
    super(model, connection);
  }
}
