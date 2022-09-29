import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class IdDocumentDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  documentType?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  documentId?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  issuingAuthority?: string;
}
