import DeliveryMan from "../../domain/DeliveryMan"

export default interface DeliveryManRepositoryInterface{
    save(deliveryMan: Omit<DeliveryMan, 'id'>): Promise<DeliveryMan>
    GetOne(id: string): Promise<DeliveryMan>
    GetAll(): Promise<Array<DeliveryMan>>
    delete(id: string): Promise<void>
    GetbyCPF(cpf: string): Promise<any>
    UpdateName(id: string, name: string): Promise<void>
    UpdateEmail(id: string, email: string): Promise<void>
}