import { PostgreSQLModule } from "@database/postgresql/postgresql.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "apps/user-service/src/user.module";
import { Transaction } from "./entities/transaction.entity";
import { Wallet } from "./entities/wallet.entity";
import { TransactionRepository } from "./repositories/transaction.repository";
import { WalletRepository } from "./repositories/wallet.repository";
import { WalletController } from "./wallet.controller";
import { WalletService } from "./wallet.service";

@Module({
  imports: [
    PostgreSQLModule,
    UserModule,
    TypeOrmModule.forFeature([Wallet, Transaction]),
    //
  ],
  controllers: [WalletController],
  providers: [WalletRepository, TransactionRepository, WalletService],
  exports: [WalletService],
})
export class WalletModule {}
