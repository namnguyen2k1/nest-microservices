import { CachingModule } from "@cache/caching.module";
import { DatabaseModule } from "@database/database.module";
import { MailModule } from "@mail/mail.module";
import { Module } from "@nestjs/common";
import { DeviceModule } from "apps/device-service/src/device.module";
import { NotificationModule } from "apps/notification-service/src/notification.module";
import { OtpModule } from "apps/otp-service/src/otp.module";
import { RoleModule } from "apps/role-service/src/role.module";
import { TokenModule } from "apps/token-service/src/token.module";
import { UserModule } from "apps/user-service/src/user.module";
import { WalletModule } from "apps/wallet-service/src/wallet.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    DatabaseModule,
    CachingModule,
    MailModule,
    RoleModule,
    UserModule,
    DeviceModule,
    TokenModule,
    OtpModule,
    WalletModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
