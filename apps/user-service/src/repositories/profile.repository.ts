import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";

import { DB_COLLECTION, DB_CONNECTION } from "@database/mongodb/constant";
import { BaseRepositoryAbstract } from "@database/repositories/abstract.repository";
import { Connection, Model } from "mongoose";
import { ProfileModel } from "../models/profile.model";

@Injectable()
export class ProfileRepository extends BaseRepositoryAbstract<ProfileModel> {
  constructor(
    @InjectModel(DB_COLLECTION.PROFILE, DB_CONNECTION.PLAYGROUND)
    readonly model: Model<ProfileModel>,

    @InjectConnection(DB_CONNECTION.PLAYGROUND)
    readonly connection: Connection,
  ) {
    super(model, connection);
  }
}
