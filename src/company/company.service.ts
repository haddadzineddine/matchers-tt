import { Injectable } from "@nestjs/common";
import { CompanyEntity } from "./entities/company.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCompanyDto } from "./dto/create-company.dto";

@Injectable()
export class CompanyService {
    constructor(@InjectRepository(CompanyEntity) private readonly companyRepository: Repository<CompanyEntity>) { }

    async create(createCompanyDto: CreateCompanyDto) {
        const company = this.companyRepository.create(createCompanyDto);
        return this.companyRepository.save(company);
    }

    async findAll() {
        return this.companyRepository.find();
    }

    async findOne(uuid: string) {
        return this.companyRepository.findOne({
            where: { uuid }
        });
    }
}