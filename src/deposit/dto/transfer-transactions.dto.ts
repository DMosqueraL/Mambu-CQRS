import { Type } from 'class-transformer';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { TransferDetailsDto } from './transferDetails.dto';

export class TransferTransactionsDto {
  @IsNumber()
  @IsPositive()
  @Min(1)
  amount: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsObject()
  @Type(() => TransferDetailsDto)
  transferDetails: TransferDetailsDto;
}
