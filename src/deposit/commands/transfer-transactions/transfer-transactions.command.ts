import { TransferTransactionsDto } from '../../dto/transfer-transactions.dto';
export class TransferTransactionCommand{
    constructor(
        /**Este ID es de la cuenta de donde se va a retirar el dinero
         * Realizar la transferencia */
        public readonly id: string,
        public readonly transferTransactionsDto: TransferTransactionsDto
    ){}
}