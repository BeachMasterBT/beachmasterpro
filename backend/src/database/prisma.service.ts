import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit {
  async onModuleInit() {
    // Isso aqui faz o sistema "ligar os motores" do banco de dados assim que o site inicia
    await this.$connect();
  }
}
