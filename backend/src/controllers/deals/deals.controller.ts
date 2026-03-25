import { Controller, Post, Get, Patch, Delete, Query, Body, Param } from '@nestjs/common';
import {DealsModel, ParamsModel} from '../../models/deals.dto'
import { DealsService } from '../../services/deals/deals.services';
import { NewDeal, Deal } from "../../types/deals.interface";

@Controller('deals')
export class DealsController {
  constructor(private dealsService: DealsService) {}

  @Post()
  async createOne(@Body() dealsModel: DealsModel): Promise<NewDeal> {
    return this.dealsService.createOne(dealsModel)
  }
  @Get()
  async getAll(@Param() paramsModel: ParamsModel): Promise<{deals: Array<Deal>, total: number}> {
    return this.dealsService.getAll(paramsModel)
  }
  @Patch(':id')
  async updateOne(@Param(':id') param: string, @Body() body: Body): Promise<Deal> {
    return this.dealsService.updateOne(param, body)
  }
  @Delete(':id')
  async deleteOne(@Param(':id') param: string): Promise<Deal> {
    return this.dealsService.deleteOne(param)
  }
}