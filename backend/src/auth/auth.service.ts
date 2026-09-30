import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { hash } from 'bcryptjs';
@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}
        async register(email: string, password: string) {
            const existing = await this.prisma.user.findUnique({ where: { email } });
            const passwordHash = await hash(password, 10);
            if (existing) throw new ConflictException('Email already exists');
        }
}
