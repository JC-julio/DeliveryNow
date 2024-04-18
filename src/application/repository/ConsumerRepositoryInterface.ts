import Consumer from "../../domain/Consumer";

export default interface ConsumerRepositoryInterface {
    save(Consumer: Omit<Consumer, 'id'>): Promise<Consumer>
    delete(id: string): Promise<void>
    GetOne(id: string): Promise<Consumer>
    GetAll(): Promise<Array<Consumer>>
    update(id: string, name: string, email: string): Promise<Array<void>>
}