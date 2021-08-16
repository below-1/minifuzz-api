import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning();
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  await app.listen(process.env.port || 3000);
}
bootstrap();
