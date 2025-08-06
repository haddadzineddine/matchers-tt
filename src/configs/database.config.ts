import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'sqlite',
    database: configService.get('database.name'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: configService.get('database.synchronize'),
})