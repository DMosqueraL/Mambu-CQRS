import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { getHeaders } from 'src/common/helpers/get-headers-helper';
import { DoneDepositEvent } from './done-deposit.event';

@EventsHandler(DoneDepositEvent)
export class DoneDepositHandlerEvent
  implements IEventHandler<DoneDepositEvent>
{
  constructor(
    private readonly config: ConfigService,
    private readonly httpAxios: AxiosAdapter,
  ) {}

  async handle(event: DoneDepositEvent) {
    const { depositTransactionsDto, id } = event;

    const logger = new Logger(DoneDepositEvent.name);

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
