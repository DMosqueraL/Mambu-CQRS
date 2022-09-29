import { WithdrawalTransactionsDto } from "src/domain/deposit/dto/withdrawal-transactions.dto";

export class WithdrawalTransactionsCommand{
    constructor(
        public readonly withdrawalTransactionsDto: WithdrawalTransactionsDto,
        public readonly id: string,
    ){}
}