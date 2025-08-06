import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './configs/database.config';
import { configurations } from './configs/configuration';
import { CompanyModule } from './company/company.module';
import { FormationModule } from './formation/fromation.module';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';
import { ResourceOwnerGuard } from './shared/guards/resource-owner.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => databaseConfig(configService),
      inject: [ConfigService],
    }),
    CompanyModule,
    FormationModule,
    ContactModule,
    AuthModule,
  ],
  controllers: [],
  providers: [ResourceOwnerGuard],
})
export class AppModule { }
