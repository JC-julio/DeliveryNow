export default interface StoreRepositoryInterface{
    save(store: Output): Promise<Output>
    GetOne(email: string): Promise<Output>
    GetAll(): Promise<Array<Output>>
    delete(email: string): Promise<void>
}

export type Output = {
    id?: string,
    name: string,
    street: string,
    number: string,
    neighborhood: string,
    CEP: string,
    description: string,
    cnpj: string,
    localization: string,
    email: string,
}