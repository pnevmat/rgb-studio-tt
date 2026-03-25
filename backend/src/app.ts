import { NestFactory } from '@nestjs/core';
import { AppRouter } from './routes/index.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import config from './config';
import EmbeddedPostgres from 'embedded-postgres';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';

async function app() {
    const dbPath = join(process.cwd(), './data/db');
    const pidFile = join(dbPath, 'postmaster.pid');

    const pgDb = new EmbeddedPostgres({
    databaseDir: dbPath,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    if (!existsSync(dbPath)) {
      console.log("⏳ Initialising database for the first time...");
      await pgDb.initialise();
    }
    if (existsSync(pidFile)) {
      try {
        unlinkSync(pidFile);
        console.log('🧹 Cleaned up old postmaster.pid');
      } catch (e) {
        console.log('⚠️ Could not remove pid file, it might be in use');
      }
    }
    await pgDb.start();
    console.log('🚀 Local PostgreSQL started');
  } catch (err) {
    console.error('Failed to start Postgres: ', err);
  }

    const app = await NestFactory.create(AppRouter);

    app.enableCors(); 
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