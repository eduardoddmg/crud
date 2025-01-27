import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:3001', // Domínio permitido (Frontend)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Se precisar enviar cookies
  });

  await app.listen(3000);
}
bootstrap();
