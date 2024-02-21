import DeliveryManRepositoryInterface from "../../repository/DeliveryManRepositoryInterface";
import { Output } from "../../repository/DeliveryManRepositoryInterface";

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
        }})
        return deliveryMans
    }
}

export type Input = string
