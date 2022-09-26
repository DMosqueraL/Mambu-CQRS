import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { ClientModule } from './client/client.module';
import { LoanModule } from './loan/loan.module';
import { DepositModule } from './deposit/deposit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CommonModule,
    ClientModule,
    LoanModule,
    DepositModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
