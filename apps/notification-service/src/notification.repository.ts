import { DB_COLLECTION, DB_CONNECTION } from "@database/mongodb/constant";
import { BaseRepositoryAbstract } from "@database/repositories/abstract.repository";
import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Notification } from "./notification.model";

@Injectable()
export class NotificationRepository extends BaseRepositoryAbstract<Notification> {
  constructor(
    @InjectModel(DB_COLLECTION.NOTIFICATION, DB_CONNECTION.PLAYGROUND)
    readonly model: Model<Notification>,

    @InjectConnection(DB_CONNECTION.PLAYGROUND)
    readonly connection: Connection,
  ) {
    super(model, connection);
  }
}
