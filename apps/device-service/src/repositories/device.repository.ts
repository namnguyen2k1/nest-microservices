import { DB_COLLECTION, DB_CONNECTION } from "@database/mongodb/constant";
import { BaseRepositoryAbstract } from "@database/repositories/abstract.repository";
import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { DeviceModel } from "../models/device.model";

@Injectable()
export class DeviceRepository extends BaseRepositoryAbstract<DeviceModel> {
  constructor(
    @InjectModel(DB_COLLECTION.DEVICE, DB_CONNECTION.PLAYGROUND)
    readonly model: Model<DeviceModel>,

    @InjectConnection(DB_CONNECTION.PLAYGROUND)
    readonly connection: Connection,
  ) {
    super(model, connection);
  }
}
