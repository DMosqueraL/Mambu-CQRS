import { ConfigService } from '@nestjs/config';
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';

import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { getHeaders } from 'src/common/helpers/get-headers-helper';
import { GetDepositByIdQuery } from '../../queries/getDepositById/get-deposit-by-id.query';
import { DepositTransactionsCommand } from './deposit-transactions.command';
import { Logger, NotFoundException } from '@nestjs/common';
import { Deposit } from 'src/deposit/models/deposit.entity';

@CommandHandler(DepositTransactionsCommand)
export class DepositTransactionsHandler
  implements ICommandHandler<DepositTransactionsCommand>
{
  constructor(
    private readonly config: ConfigService,
    private readonly httpAxios: AxiosAdapter,
  ) {}

  async execute(command: DepositTransactionsCommand): Promise<any> {
    const logger = new Logger('DepositTransactions');

    const { depositTransactionsDto, id } = command;

    const headers = getHeaders(this.config);

    const data = await this.httpAxios.post<any>(
      this.config.get('urlDeposits') + id + '/deposit-transactions',
      depositTransactionsDto,
      {
        headers,
        baseURL: this.config.get('baseUrl'),
      },
    );
    logger.log(`The Deposit transaction was successful`);
    return data;
  }
}
