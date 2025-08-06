import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateFormationDto {
    @ApiProperty({
        description: "Name of the formation",
        example: "React Developer Bootcamp"
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: "UUID of the contact associated with this formation",
        example: "b3b7c8e2-1f2a-4c3d-9e5f-123456789abc"
    })
    @IsNotEmpty()
    @IsUUID()
    contactId: string;

    @ApiProperty({
        description: "UUID of the company associated with this formation",
        example: "b3b7c8e2-1f2a-4c3d-9e5f-123456789abc"
    })
    @IsNotEmpty()
    @IsUUID()
    companyId: string;
}
