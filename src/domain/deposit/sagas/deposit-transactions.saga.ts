import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { delay, map, Observable } from 'rxjs';

import { CreatedDepositEvent } from '../events/created-deposit/created-deposit.event';
import { CreateDepositCommand } from '../commands/create-deposit/create-deposit.command';
import { DoneDepositEvent } from '../events/done-deposit/done-deposit.event';
import { DepositTransactionsCommand } from '../commands/deposit-transactions/deposit-transactions.command';

@Injectable()
export class DepositTransactionSagas {
  logger = new Logger(DepositTransactionSagas.name);

  @Saga()
  createdDepositAccount = (
    events$: Observable<CreatedDepositEvent>,
  ): Observable<ICommand> => {
    return events$.pipe(
      delay(2000),
      ofType(CreatedDepositEvent),
      map((event) => {
        this.logger.log('Saga call CreateDepositCommand');
        return new CreateDepositCommand(event.createDepositDto);        
      }),
    );
  };

  @Saga()
  doneDepositTransaction = (
    events$: Observable<DoneDepositEvent>,
  ): Observable<ICommand> => {
    return events$.pipe(
      delay(1000),
      ofType(DoneDepositEvent),
      map((event) => {
        this.logger.log('Saga call DepositTransactionCommand');
        return new DepositTransactionsCommand(
          event.depositTransactionsDto,
          event.id,
        );
      }),
    );
  };
}
