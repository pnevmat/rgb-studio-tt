import { Controller, Post, Get, Patch, Delete, Query, Body, Param } from '@nestjs/common';
import {ClientsModel, ParamsModel} from '../../models/clients.dto';
import { ClientsService } from '../../services/clients/clients.service';
import { NewClient, Client, ClientsParams } from "../../types/clients.interface";
import { log } from 'console';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Post()
  async createOne(@Body() clientsModel: ClientsModel): Promise<NewClient> {
    return this.clientsService.createOne(clientsModel)
  }
  @Get()
  async getAll(@Query() paramsModel: ParamsModel): Promise<{clients: Array<Client>, total: number}> {
    return this.clientsService.getAll(paramsModel)
  }
  @Get(':id')
  async getOne(@Param(':id') param: string): Promise<Client | string> {
    return this.clientsService.getOne(param)
  }
  @Patch(':id')
  async updateOne(@Param(':id') param: string, @Body() body: Body): Promise<Client | string> {
    return this.clientsService.updateOne(param, body)
  }
  @Delete(':id')
  async deleteOne(@Param(':id') param: string): Promise<Client | string> {
    return this.clientsService.deleteOne(param)
  }
}