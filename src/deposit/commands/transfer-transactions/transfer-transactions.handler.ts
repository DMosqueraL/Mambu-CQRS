import { Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { getHeaders } from 'src/common/helpers/get-headers-helper';
import { Deposit } from 'src/deposit/models/deposit.entity';
import { GetDepositByIdQuery } from '../../queries/getDepositById/get-deposit-by-id.query';
import { TransferTransactionCommand } from './transfer-transactions.command';

@CommandHandler(TransferTransactionCommand)
export class TransferTransactionHandler
  implements ICommandHandler<TransferTransactionCommand>
{
  constructor(
    private readonly config: ConfigService,
    private readonly httpAxios: AxiosAdapter,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: TransferTransactionCommand): Promise<any> {
    const logger = new Logger('TransferTransactions');

    const { transferTransactionsDto, id } = command;

    const headers = getHeaders(this.config);

    /** Verifica la existencia de la cuenta de envío */
    const envio = await this.queryBus.execute<GetDepositByIdQuery, Deposit>(
      new GetDepositByIdQuery(id),
    );

    /** Verifica la existencia de la cuenta destino */
    const destino = await this.queryBus.execute<GetDepositByIdQuery, Deposit>(
      new GetDepositByIdQuery(
        transferTransactionsDto.transferDetails.linkedAccountId,
      ),
    );

    /** Verifica que la cuenta destino se encuentre ACTIVA o APROBADA para recibir transferencia */
    if (
      destino.accountState === 'ACTIVE' ||
      destino.accountState === 'APPROVED'
    ) {
      const retiro = transferTransactionsDto.amount;

      const availableBalance = envio.balances.availableBalance;

      if (
        envio.accountState === 'ACTIVE' &&
        availableBalance > 0 &&
        retiro <= availableBalance
      ) {
        const data = await this.httpAxios.post<any>(
          this.config.get('urlDeposits') + id + '/transfer-transactions',
          transferTransactionsDto,
          {
            headers,
            baseURL: this.config.get('baseUrl'),
          },
        );
        logger.log(
          `The transfer transaction was successful`
        );
        return data;
      }
      logger.log(`The Deposit Account with Id: ${id} has insufficient funds.`);
      throw new NotFoundException(
        'Insufficient funds. ¡Please check your balance!',
      );
    }
    logger.log(
      `The Deposit Account with Id: ${transferTransactionsDto.transferDetails.linkedAccountId} must be ACTIVE or APPROVED for to do this transaction.`,
    );
    throw new NotFoundException(
      'This Deposit Account must be ACTIVE or APPROVED for to do this transaction.',
    );
  }
}
