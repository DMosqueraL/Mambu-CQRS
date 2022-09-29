import { CreateLoanDto } from "../../dto/create-loan.dto";


export class CreateLoanCommand {
    constructor(
        public readonly createLoanDto: CreateLoanDto
    ){}
}