import { DB_COLLECTION, DB_CONNECTION } from "@database/mongodb/constant";
import { MongodbModule } from "@database/mongodb/mongodb.module";
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { DeviceModule } from "apps/device-service/src/device.module";
import { UserModule } from "apps/user-service/src/user.module";
import { HashingService } from "./services/hashing.service";
import { JsonWebTokenService } from "./services/json-web-token.service";
import { TokenService } from "./services/token.service";
import { TokenController } from "./token.controller";
import { TokenRepository } from "./token.repository";
import { TokenSchema } from "./token.schema";

const PROVIDERS = [JsonWebTokenService, HashingService, TokenService];

@Module({
  imports: [
    MongodbModule,
    DeviceModule,
    UserModule,
    MongooseModule.forFeature(
      [
        {
          name: DB_COLLECTION.TOKEN,
          schema: TokenSchema,
        },
      ],
      DB_CONNECTION.PLAYGROUND,
    ),
  ],
  controllers: [TokenController],
  providers: [TokenRepository, JwtService, ...PROVIDERS],
  exports: [...PROVIDERS],
})
export class TokenModule {}
