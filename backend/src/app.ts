import { NestFactory } from '@nestjs/core';
import { AppRouter } from './routes/index.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import config from './config';
import EmbeddedPostgres from 'embedded-postgres';

async function app() {
    const pgDb = new EmbeddedPostgres({
    databaseDir: './data/db',
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    await pgDb.initialise();
    await pgDb.start();
    console.log('🚀 Local PostgreSQL started');
  } catch (err) {
    console.error('Failed to start Postgres', err);
  }

    const app = await NestFactory.create(AppRouter);

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));

    const document = SwaggerModule.createDocument(app, config.swagger);
    SwaggerModule.setup('api', app, document);
    
    const port = process.env.PORT ?? 5000;
    
    await app.listen(port, () => console.log(`Test CI/CD. Server runs on the port ${port}.`));
}

app();