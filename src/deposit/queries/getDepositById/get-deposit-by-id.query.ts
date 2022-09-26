import { PaginationDto } from "src/common/dto/pagination.dto";

export class GetDepositByIdQuery{
    constructor(
        public readonly id: string,
        public readonly details?: PaginationDto
    ){}
}