import { BasePostgresqlType } from "./base.types";
import { Transaction } from "./transaction.types";

export interface Wallet extends BasePostgresqlType {
  userId: string; // relation with Users collection (MongoDB)
  balance: number;
  transactions: Transaction[];
}
