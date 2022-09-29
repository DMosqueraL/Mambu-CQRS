import { IsEnum, IsOptional, IsString } from "class-validator";
import { LinkedAccountType } from "../enums/linkedAccountType.enum";

export class TransferDetailsDto{

    /**Este es el ID de la cuenta que va a recibir la transferencia */
    @IsString()
    linkedAccountId: string;

    @IsString()
    @IsOptional()
    linkedAccountKey?: string;

    @IsString()
    @IsEnum(LinkedAccountType)
    linkedAccountType: LinkedAccountType
}