import { ApproveLoanDto } from '../dto/approve-loan.dto';

export class ApprovedLoanEvent{
    constructor(
        public readonly id: string,
        public readonly approveLoanDto: ApproveLoanDto
    ){}
}