import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { DepositTransactionsCommand } from './deposit-transactions.command';
import { DoneDepositEvent } from '../../events/done-deposit/done-deposit.event';

@CommandHandler(DepositTransactionsCommand)
export class DepositTransactionsHandler
  implements ICommandHandler<DepositTransactionsCommand>
{
  constructor(
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DepositTransactionsCommand): Promise<any> {
    const logger = new Logger('DepositTransactions');

    const { depositTransactionsDto, id } = command;

    const depositDone = this.eventBus.publish(
      new DoneDepositEvent(depositTransactionsDto, id),
    );
    logger.log(`DoneDepositEvent called...`);   
    //return depositDone; 
  }
}
