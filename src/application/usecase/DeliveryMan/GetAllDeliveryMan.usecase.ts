import DeliveryManRepositoryInterface from "../../repository/DeliveryManRepositoryInterface";

export default class GetAllDeliveryMans {
    constructor(readonly repo: DeliveryManRepositoryInterface) {}
    async execute(): Promise<Output[]> {
        const deliveryMans = (await this.repo.GetAll()).map((DeliveryMan) => {
        return {
            name: DeliveryMan.name,
            CPF: DeliveryMan.CPF,
            email: DeliveryMan.email,
            vehicle: DeliveryMan.vehicle,
            vehicleColor: DeliveryMan.vehicleColor,
            plate: DeliveryMan.plate,
            id: DeliveryMan.id,
        }})
        return deliveryMans
    }
}

export type Input = string

export type Output = {
    id: string,
    name: string,
    CPF: string,
    email: string,
    vehicle: string,
    vehicleColor: string,
    plate: string,
}