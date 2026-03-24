import { Module } from '@nestjs/common';
import { ClientsRouter } from './clients/clients.module';
import { DealsRouter } from './deals/deals.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Client} from '../dbEntities/client.entity';
import {Deal} from '../dbEntities/deal.entity';

const EnvConfig = ConfigModule.forRoot({isGlobal: true, envFilePath: `${process.cwd()}/.env`})
const TypeOrmDbConfig = TypeOrmModule.forRoot({
  type: 'postgres',
  host: '127.0.0.1',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'postgres',
  autoLoadEntities: true,
  entities: [Client, Deal],
  synchronize: true,
})

@Module({
  imports: [EnvConfig, TypeOrmDbConfig, ClientsRouter, DealsRouter],
})

export class AppRouter {}