import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as logger from "morgan"
import helmet from "helmet"
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['log'] });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true, transformOptions: { enableImplicitConversion: true }, }));
  app.use(logger('dev'))
  app.use(helmet())
  app.enableCors({
    origin: '*',
  });
  await app.listen(7200);
}
bootstrap();
