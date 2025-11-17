import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DbExceptionFilter } from './filters/db-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false, // Required for Better Auth
  });
  app.useGlobalFilters(new DbExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
