import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CommonModule } from 'src/common/common.module';
import { CreateDepositHandler } from './commands/create-deposit/create-deposit.handler';
import { DepositTransactionsHandler } from './commands/deposit-transactions/deposit-transactions.handler';
import { GetDepositByIdHandler } from './queries/getDepositById/get-deposit-by-id.handler';
import { TransferTransactionHandler } from './commands/transfer-transactions/transfer-transactions.handler';
import { WithdrawalTransactionsHandler } from './commands/withdrawal-transactions/withdrawal-transactions.handler';

import { DepositController } from './deposit.controller';
import { ActiveApprovedMiddleware } from './middlewares/active-approved.middleware';
import { DepositTransactionSagas } from './sagas/deposit-transactions.saga';
import { CreatedDepositHandlerEvent } from './events/created-deposit/created-deposit.handler';
import { DoneDepositHandlerEvent } from './events/done-deposit/done-deposit.handler';

@Module({
  imports: [CommonModule, CqrsModule],
  controllers: [DepositController],
  providers: [
    CreateDepositHandler,
    CreatedDepositHandlerEvent,
    DepositTransactionsHandler,
    DoneDepositHandlerEvent,
    GetDepositByIdHandler,
    WithdrawalTransactionsHandler,
    TransferTransactionHandler,
   //DepositTransactionSagas
  ],
})
export class DepositModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ActiveApprovedMiddleware)
      .forRoutes(        
        {
          path: 'deposits/:id/deposit-transactions',
          method: RequestMethod.POST,
        },
        {
          path: 'deposits/:id/withdrawal-transactions',
          method: RequestMethod.POST,
        },
        {
          path: 'deposits/:id/transfer-transactions',
          method: RequestMethod.POST,
        },
      );
  }
}
