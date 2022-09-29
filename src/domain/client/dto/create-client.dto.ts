import { Type } from 'class-transformer';
import {
  IsString,
  IsEnum,
  IsInt,
  IsOptional,
  IsNotEmpty,
  IsArray,
  IsObject,
  ValidateNested,
} from 'class-validator';

import { Gender, PreferredLanguage, State } from '../enums/index';
import { AddressDto } from './address.dto';
import { IdDocumentDto } from './id-document.dto';
import { PersonalizadosDto } from './personalizados.dto';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  middleName?: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  homePhone?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  mobilePhone?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  emailAddress?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested()
  idDocuments?: IdDocumentDto;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  birthDate?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  addresses?: AddressDto;

  @IsString()
  @IsOptional()
  @IsEnum(Gender)
  @IsNotEmpty()
  gender?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  notes?: string;

  @IsString()
  @IsOptional()
  @IsEnum(State)
  @IsNotEmpty()
  state?: string;

  @IsString()
  @IsOptional()
  @IsEnum(PreferredLanguage)
  @IsNotEmpty()
  preferredLanguage?: string;

  @IsString()
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  groupKeys?: string[];

  @IsInt()
  @IsOptional()
  @IsNotEmpty()
  loanCycle?: number;

  @IsInt()
  @IsOptional()
  @IsNotEmpty()
  groupLoanCycle?: number;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @IsOptional()
  @Type(() => PersonalizadosDto)
  _personalizados: PersonalizadosDto;
}
