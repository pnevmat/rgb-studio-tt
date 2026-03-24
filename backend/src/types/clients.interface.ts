export interface NewClient {
    name: string,
    email: string,
    phone?: string | undefined,
    createdAt?: string | undefined,
    updatedAt?: string | undefined
}
export interface Client {
    id: string,
    name: string,
    email: string,
    phone?: string | undefined,
    createdAt?: string | undefined,
    updatedAt?: string | undefined
}

export interface ClientsParams {
    page?: string | undefined,
    limit?: string | undefined
}