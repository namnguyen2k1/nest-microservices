import { registerAs } from "@nestjs/config";

export default registerAs("APP_CONFIG", () => {
  return {
    env: process.env.APP_ENV || "development",
    telegramChatID: process.env.TELEGRAM_CHAT_ID || "",
    port: parseInt(process.env.APP_PORT || "3000", 10),
    rolePort: parseInt(process.env.APP_ROLE_PORT || "3001", 10),
    userPort: parseInt(process.env.APP_USER_PORT || "3002", 10),
    tokenPort: parseInt(process.env.APP_TOKEN_PORT || "3003", 10),
    devicePort: parseInt(process.env.APP_DEVICE_PORT || "3004", 10),
    otpPort: parseInt(process.env.APP_OTP_PORT || "3005", 10),
    notificationPort: parseInt(process.env.APP_NOTIFICATION_PORT || "3006", 10),
    walletPort: parseInt(process.env.APP_WALLET_PORT || "3007", 10),
    authPort: parseInt(process.env.APP_AUTH_PORT || "3008", 10),
    name: process.env.APP_NAME || "NestJS App",
    url: process.env.APP_URL || `http://localhost:${process.env.APP_PORT || 3000}`,
  };
});
