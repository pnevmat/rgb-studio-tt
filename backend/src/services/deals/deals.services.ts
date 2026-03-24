import { Injectable } from '@nestjs/common';
import { NewDeal, Deal, DealsParams } from '../../types/deals.interface';
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class DealsService {
  private readonly deals: Deal[] = [];

  async createOne(deal: NewDeal) {
    const newDeal = {id: uuidv4(), ...deal};
    this.deals.push(newDeal);
    return newDeal
  }
  async getAll(params: DealsParams) {
    const {clientId, status} = params;
    if (!clientId) return 'Client id is required'
    const filteredDeals = this.deals.filter(deal => deal.client === clientId)
    if (!status) return filteredDeals

    return filteredDeals.filter(deal => deal.status === status)
  }
  async updateOne(id: string, data: object) {
    const deal = this.deals.find(deal => deal.id === id)
    if (!deal) return 'Deal does not exist'

    const newDeal = {...deal, ...data}
    this.deals[this.deals.indexOf(deal)] = newDeal

    return newDeal
  }
  async deleteOne(id: string) {
    const deal = this.deals.find(client => client.id === id)
    if (!deal) return 'Deal does not exist'
    this.deals.splice(this.deals.indexOf(deal), 1)
    return deal
  }
}