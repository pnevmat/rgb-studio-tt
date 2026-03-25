import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Deal} from '../../dbEntities/deal.entity';
import { NewDeal, DealsParams } from '../../types/deals.interface';
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deal)
    private readonly deals: Repository<Deal>
  ) {}

  async createOne(deal: NewDeal) {
    const newDeal = this.deals.create({id: uuidv4(), ...deal});
    return await this.deals.save(newDeal);
  }
  async getAll(params: DealsParams) {
    const {clientId, status} = params;
    if (!clientId)  throw new NotFoundException('Client id is required');

    const [deals, total] = await this.deals.findAndCount({
      where: { 
        client: clientId
      },
      order: { createdAt: 'DESC' },
    });

    if (!status) return {deals, total};

    return {deals: deals.filter(deal => deal.status === status), total}
  }
  async getOne(id: string) {
    const deal = await this.deals.findOne({
      where: { id },
      relations: ['clients']
    })

    if (!deal) throw new NotFoundException('Deal not found');
    return deal
  }
  async updateOne(id: string, data: object) {
    const deal = await this.deals.preload({
      id: id,
      ...data,
    });

    if (!deal) throw new NotFoundException('Deal does not exist');
    return await this.deals.save(deal);
  }
  async deleteOne(id: string) {
    const deal = await this.getOne(id);
    if (!deal) throw new NotFoundException('Deal does not exist');

    await this.deals.remove(deal);
    return deal
  }
}