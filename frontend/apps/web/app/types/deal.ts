export enum DealStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  WON = 'WON',
  LOST = 'LOST',
}

export type Deal = {
  id: string
  title: string
  amount: number
  status: DealStatus
  client: { id: string; name: string } // Связанный объект клиента
  createdAt: string
}