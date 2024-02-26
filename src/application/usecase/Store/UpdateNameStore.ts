import StoreRepositoryInterface from "../../../application/repository/StoreRepositoryInterface";

export default class UpdateNameStore {
    constructor(readonly repo: StoreRepositoryInterface) {}
    async execute(props: Input): Promise<void> {
        await this.repo.UpdateName(props.id, props.name)
    } 
}

export type Input = {
    id: string,
    name: string,
}