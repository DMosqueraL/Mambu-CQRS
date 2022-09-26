import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class DepositTransactionsDto{

    @IsNumber()
    @IsPositive()
    amount: number;

    @IsString()
    @IsOptional()
    notes?: string;
}