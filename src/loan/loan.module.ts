import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommonModule } from 'src/common/common.module';
import { CreateLoanHandler } from './commands/create-loan/create-loan.handler';
import { LoanController } from './loan.controller';
import { ApprovedLoanHandler } from './events/approved-loan.handler';
import { ApproveLoanHandler } from './commands/approve-loan/approve-loan.handler';
import { GetLoanByIdHandler } from './queries/get-loan-by-id/get-loan-by-id.handler';

@Module({
  imports: [CommonModule, CqrsModule],
  controllers: [LoanController],
  providers: [
    CreateLoanHandler,
    ApproveLoanHandler,
    ApprovedLoanHandler,
    GetLoanByIdHandler
  ]
})
export class LoanModule {}
