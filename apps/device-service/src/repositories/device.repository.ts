import { DB_COLLECTION, DB_CONNECTION } from "@database/mongodb/constant";
import { BaseMongodbRepository } from "@database/repositories/base-mongodb.repository";
import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { DeviceModel } from "../models/device.model";

@Injectable()
export class DeviceRepository extends BaseMongodbRepository<DeviceModel> {
  constructor(
    @InjectModel(DB_COLLECTION.DEVICE, DB_CONNECTION.PLAYGROUND)
    readonly model: Model<DeviceModel>,

    @InjectConnection(DB_CONNECTION.PLAYGROUND)
    readonly connection: Connection,
  ) {
    super(model, connection);
  }
}
