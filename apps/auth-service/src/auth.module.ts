import { CachingModule } from "@cache/caching.module";
import { MailModule } from "@mail/mail.module";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { DeviceModule } from "apps/device-service/src/device.module";
import { NotificationModule } from "apps/notification-service/src/notification.module";
import { OtpModule } from "apps/otp-service/src/otp.module";
import { RoleModule } from "apps/role-service/src/role.module";
import { TokenModule } from "apps/token-service/src/token.module";
import { UserModule } from "apps/user-service/src/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtGuard } from "./guards/jwt.guard";
import { RequiredAccessGuard } from "./guards/required-access.guard";

@Module({
  imports: [
    UserModule,
    RoleModule,
    OtpModule,
    DeviceModule,
    TokenModule,
    CachingModule,
    NotificationModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RequiredAccessGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
