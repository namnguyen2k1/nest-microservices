import { DB_COLLECTION, DB_CONNECTION } from "@database/mongodb/constant";
import { BaseRepositoryAbstract } from "@database/repositories/abstract.repository";
import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Location } from "../models/location.model";

@Injectable()
export class LocationRepository extends BaseRepositoryAbstract<Location> {
  constructor(
    @InjectModel(DB_COLLECTION.LOCATION, DB_CONNECTION.PLAYGROUND)
    readonly model: Model<Location>,

    @InjectConnection(DB_CONNECTION.PLAYGROUND)
    readonly connection: Connection,
  ) {
    super(model, connection);
  }
}
