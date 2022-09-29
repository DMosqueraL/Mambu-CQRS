import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { getHeaders } from 'src/common/helpers/get-headers-helper';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { CreatedDepositEvent } from './created-deposit.event';

@EventsHandler(CreatedDepositEvent)
export class CreatedDepositHandlerEvent
  implements IEventHandler<CreatedDepositEvent>
{
  constructor(
    private readonly config: ConfigService,
    private readonly httpAxios: AxiosAdapter,
  ) {}

  async handle(event: CreatedDepositEvent) {
    const logger = new Logger(CreatedDepositEvent.name);
   
    const { createDepositDto } = event;

    const headers = getHeaders(this.config);

    const data = await this.httpAxios.post<any>(
      this.config.get('urlDeposits'),
      createDepositDto,
      {
        headers,
        baseURL: this.config.get('baseUrl'),
      },
    );
    logger.log(`Deposit Account with ${data.id} was created.`);

    return data;
  }
}
