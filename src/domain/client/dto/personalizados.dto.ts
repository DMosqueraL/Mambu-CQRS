import { IsNotEmpty, IsUUID } from 'class-validator';

export class PersonalizadosDto{
    @IsUUID()
    @IsNotEmpty()
    External_ID: string;
}