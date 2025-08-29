import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { OTP } from "./otp.model";

export type OTPDocument = HydratedDocument<OTP>;

export const OTPSchema = SchemaFactory.createForClass(OTP);

OTPSchema.loadClass(OTP);

MongodbUtils.customSchemaHooks({ schema: OTPSchema });
