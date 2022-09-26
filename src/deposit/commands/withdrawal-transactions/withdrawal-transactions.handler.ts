import { ConfigService } from '@nestjs/config';
import { Logger, NotFoundException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';

import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { getHeaders } from 'src/common/helpers/get-headers-helper';
import { Deposit } from 'src/deposit/models/deposit.entity';

import { GetDepositByIdQuery } from '../../queries/getDepositById/get-deposit-by-id.query';
import { WithdrawalTransactionsCommand } from './withdrawal-transactions.command';

@CommandHandler(WithdrawalTransactionsCommand)
export class WithdrawalTransactionsHandler
  implements ICommandHandler<WithdrawalTransactionsCommand>
{
  constructor(
    private readonly config: ConfigService,
    private readonly httpAxios: AxiosAdapter,
    private readonly queryBus: QueryBus
  ) {}

  async execute(command: WithdrawalTransactionsCommand): Promise<any> {

    const logger = new Logger('WithdrawalTransactions');

    const { withdrawalTransactionsDto, id } = command;

    const headers = getHeaders(this.config);

    /** Verifica la existencia de la cuenta */
    const deposit = await this.queryBus.execute<
      GetDepositByIdQuery,
      Deposit
    >(new GetDepositByIdQuery(id));

    /** Verifica que la cuenta se encuentre ACTIVA para retirar */
    if (deposit.accountState !== 'ACTIVE'){
      logger.log(
        `The Deposit Account with Id: ${id} must be ACTIVE for to do this transaction.`
      );
      throw new NotFoundException(
        'This Deposit Account must be ACTIVE for to do this transaction.',
      );
    }

    /** Hacer el retiro de la cuenta de depósito */
    if (deposit.balances.totalBalance > 0) {
      if (withdrawalTransactionsDto.amount <= deposit.balances.totalBalance) {
        const data = await this.httpAxios.post<any>(
          this.config.get('urlDeposits') + id + '/withdrawal-transactions',
          withdrawalTransactionsDto,
          {
            headers,
            baseURL: this.config.get('baseUrl'),
          },
        );
        logger.log(
          `The Withdrawal transaction was successful`
        );
        return data;
      }
      logger.log(
        `The Deposit Account with Id: ${id} has an insufficient funds.`
      );
      throw new NotFoundException(
        'This Deposit Account has an insufficient funds. ¡Please Check your balance!*',
      );
    }
    logger.log(
      `The Available Balance $0.0`
    );
    throw new NotFoundException('Cannot do this transaction. --> Balance $0.0');
  }
}
