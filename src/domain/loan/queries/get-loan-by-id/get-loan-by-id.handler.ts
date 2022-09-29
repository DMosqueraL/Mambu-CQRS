import { ConfigService } from '@nestjs/config';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { getHeaders } from 'src/common/helpers/get-headers-helper';
import { Loan } from '../../models/loan.entity';
import { GetLoanByIdQuery } from './get-loan-by-id.query';
import { Logger, NotFoundException } from '@nestjs/common';

@QueryHandler(GetLoanByIdQuery)
export class GetLoanByIdHandler implements IQueryHandler<GetLoanByIdQuery> {
  constructor(
    private readonly config: ConfigService,
    private readonly httpAxios: AxiosAdapter,
  ) {}

  async execute(query: GetLoanByIdQuery): Promise<any> {
    const logger = new Logger('GetLoanById');

    const { id, details } = query;

    const headers = getHeaders(this.config);

    const data = await this.httpAxios.getById<Loan>(
      this.config.get('urlLoans') + id,
      {
        headers,
        baseURL: this.config.get('baseUrl'),
        params: details,
      },
    );

    /**Si la data NO existe, retorna null */
    if (data === null) {
      logger.log("This Loan doesn't exist");
      throw new NotFoundException("This Loan doesn't exist");
    }
    logger.log(`Retriving Loan with Id: ${data.id}...`);
    return data;
  }
}
