import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FormationController } from "./formation.controller";
import { FormationService } from "./formation.service";
import { FormationEntity } from "./entities/formation.entity";
import { CompanyModule } from "src/company/company.module";
import { ContactModule } from "src/contact/contact.module";

@Module({
    imports: [TypeOrmModule.forFeature([FormationEntity]), CompanyModule, ContactModule],
    controllers: [FormationController],
    providers: [FormationService],
    exports: [FormationService],
})
export class FormationModule { }
