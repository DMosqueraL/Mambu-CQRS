import { DepositTransactionsDto } from "../../dto/deposit-transactions.dto";

export class DoneDepositEvent{
    constructor(
        public readonly depositTransactionsDto: DepositTransactionsDto,
        public readonly id: string
    ){}
}