import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { TokenModel } from "./token.model";

export type TokenDocument = HydratedDocument<TokenModel>;

export const TokenSchema = SchemaFactory.createForClass(TokenModel);

TokenSchema.loadClass(TokenModel);

MongodbUtils.customSchemaHooks({ schema: TokenSchema });
