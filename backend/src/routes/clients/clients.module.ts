import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Client} from '../../dbEntities/client.entity';
import { ClientsController } from '../../controllers/clients/clients.controller';
import { ClientsService } from '../../services/clients/clients.service';

@Module({
    imports: [TypeOrmModule.forFeature([Client])],
    controllers: [ClientsController],
    providers: [ClientsService],
})

export class ClientsRouter {}