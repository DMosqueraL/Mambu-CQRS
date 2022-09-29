import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';

import { CreateDepositCommand } from './create-deposit.command';
import { Deposit } from '../../models/deposit.entity';
import { ConfigService } from '@nestjs/config';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { getHeaders } from 'src/common/helpers/get-headers-helper';
import { Logger } from '@nestjs/common';

@CommandHandler(CreateDepositCommand)
export class CreateDepositHandler
  implements ICommandHandler<CreateDepositCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateDepositCommand): Promise<any> {
    
    const { createDepositDto } = command;

    const depositCreated = this.publisher.mergeObjectContext(
      new Deposit(
        createDepositDto.accountHolderKey,
        createDepositDto.accountType,
        createDepositDto.name,
        createDepositDto.productKey,
      ),
    );

    depositCreated.createDepositAccount(createDepositDto);
    depositCreated.commit();
    
    return depositCreated;
  }
}
