import { PaginationDto } from "src/common/dto/pagination.dto";

export class GetClientsQuery {
    constructor(
        public readonly paginationDto: PaginationDto
    ){}
}