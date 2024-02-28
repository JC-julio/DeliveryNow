import StoreRepositoryInterface from "../../repository/StoreRepositoryInterface";


export default class UpdateEmailStore {
    constructor(readonly repo: StoreRepositoryInterface) {}
    async execute(props: Input): Promise<void> {
        await this.repo.UpdateEmail(props.id, props.email)
    }
}

export type Input = {
    id: string,
    email: string,
}