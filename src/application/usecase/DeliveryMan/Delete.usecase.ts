import DeliveryManRepositoryInterface from "../../repository/DeliveryManRepositoryInterface";

export default class DeleteDeliveryMan {
    constructor(readonly repo: DeliveryManRepositoryInterface) {
    }
    async execute(email: Input): Promise<void> {
        if (!await this.repo.GetOne(email))
            throw new Error("Email não encotrados")
        await this.repo.delete(email)
    }
}

export type Input = string