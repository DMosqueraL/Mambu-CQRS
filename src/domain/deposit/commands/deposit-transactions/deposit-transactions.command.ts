import { DepositTransactionsDto } from "src/domain/deposit/dto/deposit-transactions.dto";

export class DepositTransactionsCommand{
    constructor(
        public readonly depositTransactionsDto: DepositTransactionsDto,
        public readonly id: string
    ){}
}