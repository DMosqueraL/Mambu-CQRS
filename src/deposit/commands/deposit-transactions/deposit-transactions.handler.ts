import { ConfigService } from '@nestjs/config';
import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';

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
    private readonly commadBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async execute(command: DepositTransactionsCommand): Promise<any> {

    const logger = new Logger('DepositTransactions');

    const { depositTransactionsDto, id } = command;

    const headers = getHeaders(this.config);

    const deposit = await this.queryBus.execute<GetDepositByIdQuery, Deposit>(
      new GetDepositByIdQuery(id),
    );

    if (
      deposit.accountState === 'APPROVED' ||
      deposit.accountState === 'ACTIVE'
    ) {
      const data = await this.httpAxios.post<any>(
        this.config.get('urlDeposits') + id + '/deposit-transactions',
        depositTransactionsDto,
        {
          headers,
          baseURL: this.config.get('baseUrl'),
        },
      );
      logger.log(
        `The Deposit transaction was successful`
      );
      return data;
    }
    logger.log(
      `The Deposit Account with Id: ${id} must be APPROVED or ACTIVE for to do transactions.`
    )
    throw new NotFoundException(
      'This Deposit Account must be APPROVED or ACTIVE for to do transactions.',
    );
  }
}
