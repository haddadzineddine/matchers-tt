import { CompanyEntity } from "src/company/entities/company.entity";
import { ContactEntity } from "src/contact/entities/contact.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('formation')
export class FormationEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    name: string;

    @ManyToOne(() => CompanyEntity, (company) => company.formations)
    company: CompanyEntity;

    @ManyToOne(() => ContactEntity, (contact) => contact.formations)
    contact: ContactEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date | null;
}