import { BasePostgresqlType } from "./base.types";
import { Wallet } from "./wallet.types";

export enum TRANSACTION_STATUS {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export enum TRANSACTION_TYPE {
  TOPUP = "TOPUP",
  WITHDRAW = "WITHDRAW",
  TRANSFER = "TRANSFER",
  DEPOSIT = "DEPOSIT",
}

export interface Transaction extends BasePostgresqlType {
  wallet: Wallet;
  amount: number;
  type: TRANSACTION_TYPE;
  provider: string; // Momo, Zalopay...
  providerTxnId: string;
  status: TRANSACTION_STATUS;
}
