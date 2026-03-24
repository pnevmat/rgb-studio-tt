import { Controller, Post, Get, Patch, Delete, Query, Body, Param } from '@nestjs/common';
import {ClientsModel, ParamsModel} from '../../models/clients.dto';
import { ClientsService } from '../../services/clients/clients.service';
import { NewClient, Client, ClientsParams } from "../../types/clients.interface";

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Post()
  async createOne(@Body() clientsModel: ClientsModel): Promise<NewClient> {
    return this.clientsService.createOne(clientsModel)
  }
  @Get()
  async getAll(@Param() paramsModel: ParamsModel): Promise<Array<Client>> {
    return this.clientsService.getAll(paramsModel)
  }
  @Get(':id')
  async getOne(@Query() query: Request): Promise<Client | string> {
    return this.clientsService.getOne('34455')
  }
  @Patch(':id')
  async updateOne(@Query() query: Request, @Body() body: Body): Promise<Client | string> {
    return this.clientsService.updateOne('344545', body)
  }
  @Delete(':id')
  async deleteOne(@Query() query: Request): Promise<Client | string> {
    return this.clientsService.deleteOne('35454')
  }
}