import { CreateDepositDto } from "src/domain/deposit/dto/create-deposit.dto";

export class CreatedDepositEvent {
    constructor(
        public readonly createDepositDto: CreateDepositDto
    ){}
}