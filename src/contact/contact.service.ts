import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ContactEntity } from "./entities/contact.entity";
import { CreateContactDto } from "./dto/create-contact.dto";
import * as bcrypt from 'bcrypt';
import { CompanyService } from "src/company/company.service";

@Injectable()
export class ContactService {
    constructor(
        private readonly companyService: CompanyService,
        @InjectRepository(ContactEntity) private readonly contactRepository: Repository<ContactEntity>) { }

    async create(createContactDto: CreateContactDto): Promise<ContactEntity> {

        const { companyId, ...contactData } = createContactDto;

        const company = await this.companyService.findOne(companyId);

        if (!company) {
            throw new BadRequestException('Company not found');
        }

        const contact = await this.contactRepository.findOne({
            where: {
                email: contactData.email,
                company: { uuid: companyId }
            }
        });

        if (contact) {
            throw new BadRequestException('Contact already exists');
        }

        const hashedPassword = await bcrypt.hash(contactData.password, 10);

        const newContact = this.contactRepository.create({
            ...contactData,
            password: hashedPassword,
            company: company
        });

        return this.contactRepository.save(newContact);
    }

    async findAll(): Promise<ContactEntity[]> {
        return this.contactRepository.find({
            relations: ['company']
        });
    }

    async findOne(uuid: string): Promise<ContactEntity> {
        const contact = await this.contactRepository.findOne({
            where: { uuid }
        });

        if (!contact) {
            throw new BadRequestException('Contact not found');
        }

        return contact;
    }

    async findOneByEmail(email: string): Promise<ContactEntity> {
        const contact = await this.contactRepository.findOne({
            where: { email },
            relations: ['company']
        });

        if (!contact) {
            throw new BadRequestException('Contact not found');
        }

        return contact;
    }
}