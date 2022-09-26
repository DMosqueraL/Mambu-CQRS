import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { AccountType } from "../enums/accountType.enum";
import { BalanceDto } from "./balance.dto";

export class CreateDepositDto {

        @IsString()        
        accountHolderKey: string;

        @IsString()
        accountHolderType: string;

        @IsString()
        name: string;

        @IsString()
        productTypeKey: string;

        @IsString()
        @IsOptional()
        notes?: string;

        
        @IsOptional()
        @Type(()=> BalanceDto)
        balances?: BalanceDto;

        @IsString()
        @IsOptional()
        @IsEnum(AccountType)
        accountType?: string;

        @IsString()
        @IsOptional()
        currencyCode?: string;
        
    
}
