import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FormationEntity } from "./entities/formation.entity";
import { CreateFormationDto } from "./dto/create-formation.dto";
import { ContactService } from "src/contact/contact.service";
import { CompanyService } from "src/company/company.service";

@Injectable()
export class FormationService {
    constructor(
        private readonly companyService: CompanyService,
        private readonly contactService: ContactService,
        @InjectRepository(FormationEntity) private readonly formationRepository: Repository<FormationEntity>) { }

    async create(createFormationDto: CreateFormationDto) {
        const { companyId, contactId, ...formationData } = createFormationDto;

        const company = await this.companyService.findOne(companyId);

        if (!company) {
            throw new BadRequestException('Company not found');
        }

        const contact = await this.contactService.findOne(contactId);

        if (!contact) {
            throw new BadRequestException('Contact not found');
        }

        const formation = this.formationRepository.create({
            ...formationData,
            company,
            contact
        });

        return this.formationRepository.save(formation);
    }

    async findAll() {
        return this.formationRepository.find();
    }

    async findAllByContact(uuid: string) {
        return this.formationRepository.find({ where: { contact: { uuid } } });
    }
}