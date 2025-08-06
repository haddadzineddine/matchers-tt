import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class UserResponseDto {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'User unique identifier' })
    id: string;

    @ApiProperty({ example: 'user@example.com', description: 'User email address' })
    email: string;

    @ApiProperty({ example: 'Acme Corp', description: 'Name of the company' })
    companyName: string;

    @ApiPropertyOptional({ example: 'John', description: 'First name of the user' })
    firstName?: string;

    @ApiPropertyOptional({ example: 'Doe', description: 'Last name of the user' })
    lastName?: string;
}

export class AuthResponseDto {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'JWT access token' })
    access_token: string;

    @ApiProperty({ type: UserResponseDto })
    user: UserResponseDto;
}