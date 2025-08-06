import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContactEntity } from "./entities/contact.entity";
import { ContactController } from "./contact.controller";
import { ContactService } from "./contact.service";
import { CompanyModule } from "src/company/company.module";

@Module({
    imports: [TypeOrmModule.forFeature([ContactEntity]), CompanyModule],
    controllers: [ContactController],
    providers: [ContactService],
    exports: [ContactService],
})
export class ContactModule { }