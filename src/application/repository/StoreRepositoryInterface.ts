import Store from "../../domain/Store"

export default interface StoreRepositoryInterface{
    save(store: Omit<Store, 'id'>): Promise<Store>
    GetOne(id: string): Promise<Store>
    GetAll(): Promise<Array<Store>>
    delete(id: string): Promise<void>
    GetbyEmail(email: string): Promise<any>
    GetbyCNPJ(cnpj: string): Promise<any>
    UpdateName(id: string, name: string): Promise<void>
    UpdateEmail(id: string, name: string): Promise<void>
}

