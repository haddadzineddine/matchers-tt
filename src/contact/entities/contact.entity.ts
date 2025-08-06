import { CompanyEntity } from "src/company/entities/company.entity";
import { FormationEntity } from "src/formation/entities/formation.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('contact')
export class ContactEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToOne(() => CompanyEntity, (company) => company.contacts)
    company: CompanyEntity;

    @OneToMany(() => FormationEntity, (formation) => formation.contact)
    formations: FormationEntity[];

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}