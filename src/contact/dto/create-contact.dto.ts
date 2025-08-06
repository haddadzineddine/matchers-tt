import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateContactDto {
    @ApiProperty({ example: 'John', description: 'First name of the contact' })
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'Last name of the contact' })
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ example: 'john.doe@example.com', description: 'Email address of the contact' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'password123', description: 'Password of the contact' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: '1', description: 'Company ID' })
    @IsString()
    @IsNotEmpty()
    companyId: string;
}