export interface NewDeal {
    title: string,
    amount: number,
    status?: string | undefined,
    client: string,
    createdAt?: string | undefined,
    updatedAt?: string | undefined
}
export interface Deal {
    id: string,
    title: string,
    amount: number,
    status?: string | undefined,
    client: string,
    createdAt?: string | undefined,
    updatedAt?: string | undefined
}

export interface DealsParams {
   clientId: string,
   status?: string
}