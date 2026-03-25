export interface NewClient {
    name: string,
    email: string,
    phone?: string | undefined,
    createdAt?: Date | undefined,
    updatedAt?: Date | undefined
}
export interface Client {
    id: string,
    name: string,
    email: string,
    phone?: string | undefined,
    createdAt?: Date | undefined,
    updatedAt?: Date | undefined
}

export interface ClientsParams {
    page?: string | undefined,
    limit?: string | undefined
}