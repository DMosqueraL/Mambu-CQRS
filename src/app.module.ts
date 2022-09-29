import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { ClientModule } from './domain/client/client.module';
import { LoanModule } from './domain/loan/loan.module';
import { DepositModule } from './domain/deposit/deposit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CommonModule,
    ClientModule,
    DepositModule,
    LoanModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
