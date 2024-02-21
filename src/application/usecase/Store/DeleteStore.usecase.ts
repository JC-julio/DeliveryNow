import StoreRepositoryInterface from "../../repository/StoreRepositoryInterface"

export default class DeleteDeliveryMan {
    constructor(readonly repo: StoreRepositoryInterface) {
    }
    async execute(email: Input): Promise<void> {
        if (!await this.repo.GetOne(email))
            throw new Error("Email não encotrado")
        await this.repo.delete(email)
    }
}

export type Input = string