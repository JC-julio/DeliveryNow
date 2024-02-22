import Store from "../../domain/Store"

export default interface StoreRepositoryInterface{
    save(store: Omit<Store, 'id'>): Promise<Store>
    GetOne(id: string): Promise<Store>
    GetAll(): Promise<Array<Store>>
    delete(id: string): Promise<void>
    GetbyEmail(email: string): Promise<any>
}

