import { DB_COLLECTION, DB_CONNECTION } from "@database/mongodb/constant";
import { BaseRepositoryAbstract } from "@database/repositories/abstract.repository";
import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Token } from "./token.model";

@Injectable()
export class TokenRepository extends BaseRepositoryAbstract<Token> {
  constructor(
    @InjectModel(DB_COLLECTION.TOKEN, DB_CONNECTION.PLAYGROUND)
    readonly model: Model<Token>,

    @InjectConnection(DB_CONNECTION.PLAYGROUND)
    readonly connection: Connection,
  ) {
    super(model, connection);
  }
}
