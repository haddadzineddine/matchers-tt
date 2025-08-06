import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FormationService } from "./formation.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ResourceOwnerGuard } from "src/shared/guards/resource-owner.guard";
import { ResourceOwner } from "src/shared/decoraters/resource-owner.decorator";
import { CreateFormationDto } from "./dto/create-formation.dto";

@ApiTags('Formation API')
@Controller('formation')
export class FormationController {
    constructor(private readonly formationService: FormationService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new formation' })
    @ApiResponse({ status: 201, description: 'The formation has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input or formation already exists' })
    async create(@Body() createFormationDto: CreateFormationDto) {
        return this.formationService.create(createFormationDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all formations' })
    @ApiResponse({ status: 200, description: 'List of all formations.' })
    async findAll() {
        return this.formationService.findAll();
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, ResourceOwnerGuard)
    @ResourceOwner({
        paramName: 'uuid',
        errorMessage: 'You are not allowed to access formations for this contact.'
    })
    @Get('/contact/:uuid')
    @ApiOperation({ summary: 'Get all formations by contact' })
    @ApiResponse({ status: 200, description: 'List of all formations by contact.' })
    @ApiResponse({ status: 401, description: 'Unauthorized. JWT token is missing or invalid.' })
    @ApiResponse({ status: 403, description: 'Forbidden. User is not allowed to access this resource.' })
    async findAllByContact(@Param('uuid') uuid: string) {
        return this.formationService.findAllByContact(uuid);
    }
}