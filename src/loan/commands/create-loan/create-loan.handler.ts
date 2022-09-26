import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { CreateLoanCommand } from './create-loan.command';
import { getHeaders } from 'src/common/helpers/get-headers-helper';
import { Logger } from '@nestjs/common';

@CommandHandler(CreateLoanCommand)
export class CreateLoanHandler implements ICommandHandler<CreateLoanCommand> {
  constructor(
    private readonly config: ConfigService,
    private readonly httpAxios: AxiosAdapter,
  ) {}

  async execute(command: CreateLoanCommand): Promise<any> {

    const logger = new Logger('CreateLoan');

    const { createLoanDto } = command;

    /**
     * Obtener los headers
     */
    const headers = getHeaders(this.config);

    const data = await this.httpAxios.post<any>(
      this.config.get('urlLoans'),
      createLoanDto,
      {
        headers,
        baseURL: this.config.get('baseUrl'),
      },
    );
      logger.log(
        `Loan with Id: ${data.id} created`
      );
    return data;
  }
}
