import DeliveryManRepositoryInterface from "../../repository/DeliveryManRepositoryInterface";
import { Output } from "../../repository/DeliveryManRepositoryInterface";

export default class GetOneDeliveryMan {
    constructor(readonly repo: DeliveryManRepositoryInterface) {}
    async execute(id: Input): Promise<Output>{
    const deliveryMan = await this.repo.GetOne(id)
    return deliveryMan
    }
}

export type Input = string
