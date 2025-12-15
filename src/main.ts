import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DbExceptionFilter } from './filters/db-exception.filter';
import { corsConfig } from './config/cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false, // Required for Better Auth
  });
  app.enableCors(corsConfig);
  app.useGlobalFilters(new DbExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Tickets API')
    .setDescription('Support Tickets Management API')
    .setVersion('1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
