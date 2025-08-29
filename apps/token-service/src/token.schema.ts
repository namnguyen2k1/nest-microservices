import { MongodbUtils } from "@database/mongodb/mongodb.utils";
import { SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Token } from "./token.model";

export type TokenDocument = HydratedDocument<Token>;

export const TokenSchema = SchemaFactory.createForClass(Token);

TokenSchema.loadClass(Token);

MongodbUtils.customSchemaHooks({ schema: TokenSchema });
