import { IsNumber, IsOptional } from 'class-validator';

export class BalanceDto {
  @IsNumber()
  @IsOptional()
  availableBalance?: number;

  @IsNumber()
  @IsOptional()
  blockedBalance?: number;

  @IsNumber()
  @IsOptional()
  feesDue?: number;

  @IsNumber()
  @IsOptional()
  forwardAvailableBalance?: number;

  @IsNumber()
  @IsOptional()
  holdBalance?: number;

  @IsNumber()
  @IsOptional()
  lockedBalance?: number;

  @IsNumber()
  @IsOptional()
  overdraftAmount?: number;

  @IsNumber()
  @IsOptional()
  overdraftInterestDue?: number;

  @IsNumber()
  @IsOptional()
  technicalOverdraftAmount?: number;

  @IsNumber()
  @IsOptional()
  technicalOverdraftInterestDue?: number;

  @IsNumber()
  @IsOptional()
  totalBalance?: number;
}
