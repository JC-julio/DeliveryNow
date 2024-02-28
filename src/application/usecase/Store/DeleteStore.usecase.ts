import StoreRepositoryInterface from "../../repository/StoreRepositoryInterface"

export default class DeleteStore {
    constructor(readonly repo: StoreRepositoryInterface) {
    }
    async execute(id: Input): Promise<void> {
        if (!await this.repo.GetOne(id))
            throw new Error("usuário não encontrado")
        await this.repo.delete(id)
    }
}

export type Input = string