import { BaseEntity } from "@database/postgresql/entities/base.entity";
import { Transaction, TRANSACTION_STATUS, TRANSACTION_TYPE, Wallet } from "@shared/types";
import { Column, Entity, Index, ManyToOne } from "typeorm";
import { WalletEntity } from "./wallet.entity";

@Entity("transactions")
export class TransactionEntity extends BaseEntity implements Transaction {
  @ManyToOne(() => WalletEntity, (wallet) => wallet.transactions, {
    onDelete: "CASCADE",
  })
  wallet: Wallet;

  @Column({ type: "bigint" })
  amount: number;

  @Column({ type: "varchar", length: 20 })
  type: TRANSACTION_TYPE;

  @Column({ type: "varchar", length: 20, nullable: true })
  provider: string; // Momo, Zalopay...

  @Index()
  @Column({ type: "varchar", length: 100, nullable: true })
  providerTxnId: string; // Momo transactionId

  @Column({ type: "varchar", length: 20 })
  status: TRANSACTION_STATUS;
}
