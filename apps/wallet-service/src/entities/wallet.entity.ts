import { BaseEntity } from "@database/postgresql/entities/base.entity";
import { Column, Entity, OneToMany, Unique } from "typeorm";
import { Transaction } from "./transaction.entity";

@Entity("wallets")
@Unique(["userId"])
export class Wallet extends BaseEntity {
  @Column({ type: "varchar", length: 24 })
  userId: string; // relation with Users collection (MongoDB)

  @Column({ type: "bigint", default: 0 })
  balance: number;

  @OneToMany(() => Transaction, (txn) => txn.wallet)
  transactions: Transaction[];
}
