import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.use(json({ limit: '11mb' }));
  app.use(urlencoded({ extended: true, limit: '11mb' }));
  await app.listen(3000);
}
bootstrap();
