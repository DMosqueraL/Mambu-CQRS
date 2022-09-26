import { CreateDepositDto } from "src/deposit/dto/create-deposit.dto";


export class CreateDepositCommand{
    constructor(
        public readonly createDepositDto: CreateDepositDto
    ){}
}