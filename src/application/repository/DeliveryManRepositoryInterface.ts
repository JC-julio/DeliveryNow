import DeliveryMan from "src/domain/DeliveryMan"

export default interface DeliveryManRepositoryInterface{
    GetOne(email: string): Promise<DeliveryMan>
    save(deliveryMan: DeliveryMan): Promise<DeliveryMan>
    GetAll(): Promise<Array<DeliveryMan>>
    delete(email: string): Promise<void>
}