import { DB_COLLECTION, DB_CONNECTION } from "@database/mongodb/constant";
import { MongodbModule } from "@database/mongodb/mongodb.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DeviceController } from "./device.controller";
import { DeviceService } from "./device.service";
import { DeviceRepository } from "./repositories/device.repository";
import { LocationRepository } from "./repositories/location.repository";
import { DeviceSchema } from "./schemas/device.schema";
import { LocationSchema } from "./schemas/location.schema";

@Module({
  imports: [
    MongodbModule,
    MongooseModule.forFeature(
      [
        {
          name: DB_COLLECTION.DEVICE,
          schema: DeviceSchema,
        },
        {
          name: DB_COLLECTION.LOCATION,
          schema: LocationSchema,
        },
      ],
      DB_CONNECTION.PLAYGROUND,
    ),
  ],
  controllers: [DeviceController],
  providers: [DeviceRepository, LocationRepository, DeviceService],
  exports: [DeviceService],
})
export class DeviceModule {}
