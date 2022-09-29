import { ApproveLoanDto } from "../../dto/approve-loan.dto";

export class ApproveLoanCommand {
    constructor(
        public readonly approveLoanDto: ApproveLoanDto,
        public readonly id: string
    ){}
}