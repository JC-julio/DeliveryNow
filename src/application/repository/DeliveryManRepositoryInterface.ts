import DeliveryMan from "src/domain/DeliveryMan"

export default interface DeliveryManRepositoryInterface{
    GetOne(email: string): Promise<Output>
    save(deliveryMan: DeliveryMan): Promise<Output>
    GetAll(): Promise<Array<Output>>
    delete(email: string): Promise<void>
}

export type Output = {
    name: string,
    id?: string, 
    CPF: string,
    email: string,
    vehicle: string,
    vehicleColor: string,
    plate: string,
}