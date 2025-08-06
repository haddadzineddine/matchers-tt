import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCompanyDto } from "./dto/create-company.dto";
import { CompanyService } from "./company.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@ApiTags('Company API')
@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new company' })
    @ApiResponse({ status: 201, description: 'The company has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
        return this.companyService.create(createCompanyDto);
    }

    @ApiOperation({ summary: 'Get all companies' })
    @ApiResponse({ status: 200, description: 'List of all companies.' })
    @ApiResponse({ status: 401, description: 'Unauthorized. JWT token is missing or invalid.' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllCompanies() {
        return this.companyService.findAll();
    }
}