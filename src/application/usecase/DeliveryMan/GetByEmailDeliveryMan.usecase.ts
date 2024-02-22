import DeliveryManRepositoryInterface from "../../repository/DeliveryManRepositoryInterface";


export default class GetbyEmailDeliveryMan {
    constructor(readonly repo: DeliveryManRepositoryInterface) {}
    async execute(email: Input): Promise<any> {
    const deliveryMan = await this.repo.GetByEmail(email)
    return deliveryMan
    }
}

export type Input = string