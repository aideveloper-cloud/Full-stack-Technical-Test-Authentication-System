import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Frontend (Next.js) รันที่ port 3000
  app.enableCors({ origin: process.env.FRONTEND_URL ?? 'http://localhost:3000' });

  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();
