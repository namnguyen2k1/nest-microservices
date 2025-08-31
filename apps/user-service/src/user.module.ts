import { ConfigurationModule } from "@config/config.module";
import { DB_COLLECTION, DB_CONNECTION } from "@database/mongodb/constant";
import { MongodbModule } from "@database/mongodb/mongodb.module";
import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MongooseModule } from "@nestjs/mongoose";
import { SERVICE } from "@shared/constants";
import { ProfileRepository } from "./repositories/profile.repository";
import { UserPermissionRepository } from "./repositories/user-permission.repository";
import { UserRepository } from "./repositories/user.repository";
import { ProfileSchema } from "./schemas/profile.schema";
import { UserPermissionSchema } from "./schemas/user-permission.schema";
import { UserSchema } from "./schemas/user.schema";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [
    ConfigurationModule,
    MongodbModule,
    MongooseModule.forFeature(
      [
        {
          name: DB_COLLECTION.USER,
          schema: UserSchema,
        },
        {
          name: DB_COLLECTION.USER_PERMISSION,
          schema: UserPermissionSchema,
        },
        {
          name: DB_COLLECTION.PROFILE,
          schema: ProfileSchema,
        },
      ],
      DB_CONNECTION.PLAYGROUND,
    ),
    ClientsModule.register([
      {
        name: SERVICE.ROLE,
        transport: Transport.TCP,
        options: { host: "0.0.0.0", port: 4001 },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserRepository, UserPermissionRepository, ProfileRepository, UserService],
  exports: [UserService],
})
export class UserModule {}
