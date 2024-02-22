import DeliveryMan from "src/domain/DeliveryMan"

export default interface DeliveryManRepositoryInterface{
    GetOne(id: string): Promise<Output>
    save(deliveryMan: DeliveryMan): Promise<Output>
    GetAll(): Promise<Array<Output>>
    delete(id: string): Promise<void>
    GetByEmail(email: string): Promise<any>
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