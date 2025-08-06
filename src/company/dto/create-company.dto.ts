import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateCompanyDto {
    @ApiProperty({ description: 'Name of the company' })
    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    name: string;

    @ApiProperty({ description: 'SIRET number of the company' })
    @IsNotEmpty()
    @IsString()
    @Matches(/^\d{14}$/, { message: 'SIRET must be exactly 14 digits' })
    siret: string;

    @ApiProperty({ description: 'Address of the company' })
    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: 'Address must be at least 3 characters long' })
    address: string;
}