import { ContactEntity } from "src/contact/entities/contact.entity";
import { FormationEntity } from "src/formation/entities/formation.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('company')
export class CompanyEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    name: string;

    @Column()
    siret: string;

    @Column()
    address: string;

    @OneToMany(() => ContactEntity, (contact) => contact.company)
    contacts: ContactEntity[];

    @OneToMany(() => FormationEntity, (formation) => formation.company)
    formations: FormationEntity[];

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}