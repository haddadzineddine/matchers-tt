import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConfig } from 'src/configs/jwt.config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ContactModule } from 'src/contact/contact.module';

@Module({
    imports: [
        ContactModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => jwtConfig(configService),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, JwtAuthGuard],
    exports: [AuthService],
})
export class AuthModule { }