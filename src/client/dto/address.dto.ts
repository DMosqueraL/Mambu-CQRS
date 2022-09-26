import { 
    IsString, 
    IsInt, 
    IsOptional,  
    IsNumber, 
    IsLatitude, 
    IsLongitude, 
    Min, 
    Max 
} from 'class-validator';

export class AddressDto {

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    postcode?: string;

    @IsOptional()
    @IsInt()
    @IsNumber()
    indexInList?: number;

    @IsOptional()
    @IsString()
    region?: string;

    @IsOptional()
    @IsString()
    line1?: string;

    @IsOptional()
    @IsString()
    line2?: string;

    @IsOptional()
    @IsNumber()
    @IsLatitude()
    @Min(-90)
    @Max(90)
    latitude?: number;

    @IsOptional()
    @IsNumber()
    @IsLongitude()
    @Min(-180)
    @Max(180)
    longitude?: number;
}