export default interface StoreRepositoryInterface{
    save(store: Output): Promise<Output>
    GetOne(id: string): Promise<Output>
    GetAll(): Promise<Array<Output>>
    delete(id: string): Promise<void>
    GetbyEmail(email: string): Promise<any>
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