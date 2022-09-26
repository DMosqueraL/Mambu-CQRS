import { Logger, NotFoundException } from '@nestjs/common';
import {
  CommandHandler,
  ICommandHandler,
  EventPublisher,
  QueryBus,
} from '@nestjs/cqrs';
import { Loan } from '../../models/loan.entity';
import { ApproveLoanCommand } from './approve-loan.command';
import { GetLoanByIdQuery } from '../../queries/get-loan-by-id/get-loan-by-id.query';

@CommandHandler(ApproveLoanCommand)
export class ApproveLoanHandler implements ICommandHandler<ApproveLoanCommand> {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: ApproveLoanCommand): Promise<any> {
    
    const { approveLoanDto, id } = command;

    const data = await this.queryBus.execute<GetLoanByIdQuery, Loan>(
      new GetLoanByIdQuery(id),
    );

    //verificar si ya esta aprobado
    if (data.accountState === 'APPROVED')
      throw new NotFoundException('This Loan already is approved');

    //Publicador de eventos
    const loan = await this.eventPublisher.mergeObjectContext(
      new Loan(
        data.id,
        data.encodedKey,
        data.accountHolderKey,
        data.accountState,
        data.loanName,
        data.loanAmount,
      ),
    );

    //Método que aplica el evento - Ver método en la Entidad
    loan.approvalLoan(id, approveLoanDto);

    //confirma el evento
    loan.commit();

    return loan;
  }
}
