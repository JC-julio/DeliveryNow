import DeliveryManRepositoryInterface from "../../repository/DeliveryManRepositoryInterface";

export default class GetOneDeliveryMan {
    constructor(readonly repo: DeliveryManRepositoryInterface) {}
    async execute(email: Input): Promise<Output>{
    const deliveryMan = await this.repo.GetOne(email)
    return deliveryMan
    }
}

export type Input = string

export type Output = {
    name: string,
    password: string, 
    CPF: string,
    email: string,
    vehicle: string,
    vehicleColor: string,
    plate: string,
}