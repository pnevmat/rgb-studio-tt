import { Injectable } from '@nestjs/common';
import { NewClient, Client, ClientsParams } from '../../types/clients.interface';
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class ClientsService {
  private readonly clients: Client[] = [];

  async createOne(client: NewClient) {
    const newClient = {id: uuidv4(), ...client}
    this.clients.push(newClient);
    return newClient;
  }

  async getAll(params: ClientsParams) {
    const {page, limit} = params;
    const defaultLimit = 5
    if (!page && !limit) return this.clients
    if (!page) return this.clients.filter((client, i) => i < Number(limit))
    if (!limit) return this.clients.filter((client, i) => i > (Number(page) - 1) * defaultLimit && i < Number(page) * defaultLimit)
    return this.clients.filter((client, i) => i > (Number(page) - 1) * Number(limit) && i < Number(page) * Number(limit));
  }
  getOne(id: string) {
    const client = this.clients.find(client => client.id === id)
    if (!client) return 'Client not found'
    return client
  }
  updateOne(id: string, data: object) {
    const client = this.clients.find(client => client.id === id)
    if (!client) return 'Client does not exist'

    const newClient = {...client, ...data}
    this.clients[this.clients.indexOf(client)] = newClient

    return newClient
  }
  deleteOne(id: string) {
    const client = this.clients.find(client => client.id === id)
    if (!client) return 'Client does not exist'
    this.clients.splice(this.clients.indexOf(client), 1)
    return client
  }
}