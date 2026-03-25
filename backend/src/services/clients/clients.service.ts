import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Client} from '../../dbEntities/client.entity';
import { NewClient, ClientsParams } from '../../types/clients.interface';
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clients: Repository<Client>
  ) {}

  async createOne(client: NewClient) {
    const existingClient = await this.clients.findOne({ 
      where: { email: client.email }
    });

    if (existingClient) throw new ConflictException('Client already exist');
    // id: uuidv4(), 
    const newClient = this.clients.create({...client});
    return await this.clients.save(newClient);
  }

  async getAll(params: ClientsParams) {
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 5;

    const [clients, total] = await this.clients.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return {clients, total};
  }
  async getOne(id: string) {
    const client = await this.clients.findOne({
      where: { id },
      relations: ['deals']
    })

    if (!client) throw new NotFoundException('Client not found');
    return client
  }
  async updateOne(id: string, data: object) {
    const client = await this.clients.preload({
      id: id,
      ...data,
    });

    if (!client) throw new NotFoundException('Client does not exist');
    return await this.clients.save(client);
  }
  async deleteOne(id: string) {
    const client = await this.getOne(id);
    if (!client) throw new NotFoundException('Client does not exist');
    await this.clients.remove(client);
    return client
  }
}