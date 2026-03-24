import { Controller, Post, Get, Patch, Delete, Query, Body, Param } from '@nestjs/common';
import { DealsService } from '../../services/deals/deals.services';
import { Deal } from "../../types/deals.interface";
import {DealsModel, ParamsModel} from '../../models/deals.dto'

@Controller('deals')
export class DealsController {
  constructor(private dealsService: DealsService) {}

  @Post()
  async createOne(@Body() dealsModel: DealsModel): Promise<Deal> {
    return this.dealsService.createOne(dealsModel)
  }
  @Get()
  async getAll(@Param() paramsModel: ParamsModel): Promise<Array<Deal> | string> {
    return this.dealsService.getAll(paramsModel)
  }
  @Patch(':id')
  async updateOne(@Query() query: Request, @Body() body: Body): Promise<Deal | string> {
    return this.dealsService.updateOne('45656', body)
  }
  @Delete(':id')
  async deleteOne(@Query() query: Request): Promise<Deal | string> {
    return this.dealsService.deleteOne('344545')
  }
}