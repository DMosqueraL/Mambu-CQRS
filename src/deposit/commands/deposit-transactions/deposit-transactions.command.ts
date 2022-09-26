import { DepositTransactionsDto } from "src/deposit/dto/deposit-transactions.dto";

export class DepositTransactionsCommand{
    constructor(
        public readonly depositTransactionsDto: DepositTransactionsDto,
        public readonly id: string
    ){}
}