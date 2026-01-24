import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Usuário não encontrado');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Senha inválida');

    return {
      accessToken: this.jwt.sign({
        sub: user.id,
        role: user.role,
      }),
    };
  }
}

