import { ConfigService } from '@nestjs/config';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';

import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { getHeaders } from 'src/common/helpers/get-headers-helper';
import { GetDepositByIdQuery } from './get-deposit-by-id.query';

@QueryHandler(GetDepositByIdQuery)
export class GetDepositByIdHandler
  implements IQueryHandler<GetDepositByIdQuery>
{
  constructor(
    private readonly config: ConfigService,
    private readonly httpAxios: AxiosAdapter,
  ) {}

  async execute(query: GetDepositByIdQuery): Promise<any> {
    const { id, details } = query;

    const headers = getHeaders(this.config);

    const data = await this.httpAxios.getById<any>(
      this.config.get('urlDeposits') + id,
      {
        headers,
        baseURL: this.config.get('baseUrl'),
        params: details,
      },
    );

    if (data === null)
      throw new NotFoundException("This Desposit Account doesn't exist");

    return data;
  }
}
