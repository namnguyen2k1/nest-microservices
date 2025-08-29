import { DB_COLLECTION, DB_CONNECTION } from "@database/mongodb/constant";
import { BaseRepositoryAbstract } from "@database/repositories/abstract.repository";
import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Device } from "../models/device.model";

@Injectable()
export class DeviceRepository extends BaseRepositoryAbstract<Device> {
  constructor(
    @InjectModel(DB_COLLECTION.DEVICE, DB_CONNECTION.PLAYGROUND)
    readonly model: Model<Device>,

    @InjectConnection(DB_CONNECTION.PLAYGROUND)
    readonly connection: Connection,
  ) {
    super(model, connection);
  }
}
