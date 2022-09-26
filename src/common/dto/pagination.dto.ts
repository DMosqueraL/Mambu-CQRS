import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsNumber()
    @Min(0)
    @IsPositive()
    offset?: number;

    @IsOptional()
    paginationDetails?: string;

    @IsOptional()
    detailsLevel?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Min(1)
    limit?: number
}