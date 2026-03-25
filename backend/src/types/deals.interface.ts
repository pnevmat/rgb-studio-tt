import {DealStatus} from '../models/deals.dto';

export interface NewDeal {
    title: string,
    amount: number,
    status?: DealStatus | undefined,
    client: string,
    createdAt?: Date | undefined,
    updatedAt?: Date | undefined
}
export interface Deal {
    id: string,
    title: string,
    amount: number,
    status?: DealStatus | undefined,
    client: string,
    createdAt?: Date | undefined,
    updatedAt?: Date | undefined
}

export interface DealsParams {
   clientId: string,
   status?: string
}