import { DB_COLLECTION, DB_CONNECTION } from "@database/mongodb/constant";
import { BaseRepositoryAbstract } from "@database/repositories/abstract.repository";
import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { OTPModel } from "./otp.model";

@Injectable()
export class OTPRepository extends BaseRepositoryAbstract<OTPModel> {
  constructor(
    @InjectModel(DB_COLLECTION.OTP, DB_CONNECTION.PLAYGROUND)
    readonly model: Model<OTPModel>,

    @InjectConnection(DB_CONNECTION.PLAYGROUND)
    readonly connection: Connection,
  ) {
    super(model, connection);
  }

  async createOtpWithTransaction(dto: Partial<OTPModel>) {
    await this.checkSupportedTransaction();

    const session = await this.connection.startSession();

    try {
      console.log("[database] session start");
      const result = await session.withTransaction<OTPModel>(
        async () => {
          // const otp = await this.model.create([dto], { session });
          // return otp[0].toObject();

          const otp = new this.model(dto);
          await otp.save({ session });
          return otp.toObject();
        },
        {
          readPreference: "primary",
          writeConcern: {
            w: "majority",
          },
          readConcern: {
            level: "local",
          },
        },
      );

      if (!result) {
        console.log("[database] transaction was intentionally aborted");
        return null;
      }

      console.log("[database] transaction run successfully");
      return result;
    } catch (error) {
      console.log("[database] error", {
        errorLabelSet: error?.errorLabelSet,
        message: error?.message,
        code: error?.code,
        codeName: error?.codeName,
      });
      throw error;
    } finally {
      await session.endSession();
      console.log("[database] session end");
    }
  }
}
