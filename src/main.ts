import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DbExceptionFilter } from './filters/db-exception.filter';
import { corsConfig } from './config/cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false, // Required for Better Auth
  });
  app.enableCors(corsConfig);
  app.useGlobalFilters(new DbExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
