import { IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class WithdrawalTransactionsDto {
    
    @IsNumber()
    @IsPositive()
    @Min(1)
    amount: number;

    @IsString()
    @IsOptional()
    notes?: string;
}