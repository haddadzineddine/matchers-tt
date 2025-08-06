import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthResponseDto } from './dto/auth-response.dto';
import { ContactEntity } from 'src/contact/entities/contact.entity';
import { LoginDto } from './dto/login.dto';
import { ContactService } from 'src/contact/contact.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly contactService: ContactService,
        private readonly jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto): Promise<AuthResponseDto> {
        try {
            const { email, password } = loginDto;

            const user = await this.contactService.findOneByEmail(email);

            if (!user) {
                throw new UnauthorizedException('Invalid credentials');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid credentials');
            }

            const payload = { id: user.uuid, email: user.email };
            return {
                access_token: this.jwtService.sign(payload),
                user: {
                    id: user.uuid,
                    email: user.email,
                    companyName: user.company.name,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }
}