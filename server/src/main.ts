import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(80);

  // ValidationPipe 적용
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
}
bootstrap();
