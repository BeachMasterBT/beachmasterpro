import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Isso aqui permite que o seu site bonitão acesse os dados do servidor!
  app.enableCors();
  
  // O servidor vai ficar "ouvindo" os pedidos na porta 3000
  await app.listen(3000);
}
bootstrap();
