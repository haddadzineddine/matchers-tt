import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ContactEntity } from "./entities/contact.entity";
import { CreateContactDto } from "./dto/create-contact.dto";
import { ContactService } from "./contact.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ResourceOwnerGuard } from "src/shared/guards/resource-owner.guard";
import { ResourceOwner } from "src/shared/decoraters/resource-owner.decorator";

@ApiTags('Contact API')
@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new contact' })
    @ApiResponse({ status: 201, description: 'The contact has been successfully created.', type: ContactEntity })
    @ApiResponse({ status: 400, description: 'Invalid input or contact already exists' })
    async create(@Body() createContactDto: CreateContactDto): Promise<ContactEntity> {
        return this.contactService.create(createContactDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all contacts' })
    @ApiResponse({ status: 200, description: 'List of all contacts.', type: [ContactEntity] })
    async findAll(): Promise<ContactEntity[]> {
        return this.contactService.findAll();
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, ResourceOwnerGuard)
    @ResourceOwner({
        paramName: 'uuid',
        errorMessage: 'You are not allowed to access this contact.'
    })
    @Get(':uuid')
    @ApiOperation({ summary: 'Get contact by UUID (only for resource owner)' })
    @ApiResponse({ status: 200, description: 'Contact details.', type: ContactEntity })
    @ApiResponse({ status: 401, description: 'Unauthorized. JWT token is missing or invalid.' })
    @ApiResponse({ status: 403, description: 'Forbidden. User is not allowed to access this resource.' })
    async findOne(@Param('uuid') uuid: string): Promise<ContactEntity> {
        return this.contactService.findOne(uuid);
    }
}
