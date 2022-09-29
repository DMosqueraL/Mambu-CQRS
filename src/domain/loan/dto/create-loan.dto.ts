import { IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, IsString } from "class-validator";

import { DisbursementDetails, InformacionAdicional, InterestSettings, ScheduleSettings } from "../interfaces/loan.interfaces";

export class CreateLoanDto {
    @IsString()
    @IsNotEmpty()
    accountHolderKey: string;

    @IsString()
    @IsNotEmpty()
    accountHolderType: string;

    @IsInt()
    @IsNumber()
    @IsPositive()
    loanAmount: number;

    @IsString()
    @IsNotEmpty()
    productTypeKey: string;

    @IsOptional()
    @IsObject()
    interestSettings: InterestSettings;

    @IsOptional()
    @IsObject()
    scheduleSettings: ScheduleSettings;

    @IsOptional()
    @IsObject()
    disbursementDetails: DisbursementDetails;

    @IsOptional()
    @IsObject()
    _Informacion_Adicional: InformacionAdicional;
}
