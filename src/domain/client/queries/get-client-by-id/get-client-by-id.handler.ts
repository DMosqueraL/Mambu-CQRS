import { Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { getHeaders } from 'src/common/helpers/get-headers-helper';
import { GetClientByIdQuery } from './get-client-by-id.query';

@QueryHandler(GetClientByIdQuery)
export class GetClientByIdHandler implements IQueryHandler<GetClientByIdQuery> {
  constructor(
    private readonly config: ConfigService,
    private readonly httpAxios: AxiosAdapter,
  ) {}

  async execute(query: GetClientByIdQuery): Promise<any> {
    const logger = new Logger(GetClientByIdHandler.name);

    const { id, details } = query;

    const headers = getHeaders(this.config);

    const data = await this.httpAxios.getById<any>(
      this.config.get('urlClients') + id,
      {
        headers,
        baseURL: this.config.get('baseUrl'),
        params: details,
      },
    );
    if (data === null) 
      throw new NotFoundException("This Client doesn't exist.");
    
    logger.log(`Retriving Client with Id: ${data.id}...`);
    return data;
  }
}
