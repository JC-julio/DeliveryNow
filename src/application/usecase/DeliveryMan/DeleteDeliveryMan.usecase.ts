import DeliveryManRepositoryInterface from "../../repository/DeliveryManRepositoryInterface";

export default class DeleteDeliveryMan {
    constructor(readonly repo: DeliveryManRepositoryInterface) {
    }
    async execute(id: Input): Promise<void> {
        if (!await this.repo.GetOne(id))
            throw new Error("usuário não encontrado")
        await this.repo.delete(id)
    }
}

export type Input = string