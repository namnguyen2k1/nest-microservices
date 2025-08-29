import { BaseEntity } from "@database/postgresql/entities/base.entity";
import { Transaction, Wallet } from "@shared/types";
import { Column, Entity, OneToMany, Unique } from "typeorm";
import { TransactionEntity } from "./transaction.entity";

@Entity("wallets")
@Unique(["userId"])
export class WalletEntity extends BaseEntity implements Wallet {
  @Column({ type: "varchar", length: 24 })
  userId: string; // relation with Users collection (MongoDB)

  @Column({ type: "bigint", default: 0 })
  balance: number;

  @OneToMany(() => TransactionEntity, (txn) => txn.wallet)
  transactions: Transaction[];
}
