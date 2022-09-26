import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { getHeaders } from 'src/common/helpers/get-headers-helper';
import { ApprovedLoanEvent } from './approved-loan.event';
import { AccountState } from '../../deposit/enums/accountState.enum';

@EventsHandler(ApprovedLoanEvent)
export class ApprovedLoanHandler implements IEventHandler<ApprovedLoanEvent> {
  constructor(
    private readonly config: ConfigService,
    private readonly httpAxios: AxiosAdapter,
  ) {}

  async handle(event: ApprovedLoanEvent) {

    const logger = new Logger(ApprovedLoanEvent.name);

    /** Obtener los headers */
    const headers = getHeaders(this.config);

    const { approveLoanDto, id } = event;

    /** Aprobar préstamo */
    const approved = await this.httpAxios.post<any>(
      this.config.get('urlLoans') + id + ':changeState', //Ruta para aprobar préstamo
      approveLoanDto,
      {
        headers,
        baseURL: this.config.get('baseUrl'),
      },
    );
    logger.log(`Loan with Id: ${approved.id} approved.`);
    return approved;
  }
}
