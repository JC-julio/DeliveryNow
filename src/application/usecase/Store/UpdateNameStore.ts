import StoreRepositoryInterface from "../../../application/repository/StoreRepositoryInterface";

export default class UpdateNameStore {
    constructor(readonly repo: StoreRepositoryInterface) {}
    async execute(props: Input): Promise<Output> {
        const store = await this.repo.UpdateName(props.id, props.name)
        return store
    } 
}

export type Input = {
    id: string,
    name: string,
}

export type Output = {
    id: string,
    name: string,
    street: string,
    number: string,
    neighborhood: string,
    CEP: string,
    description: string,
    cnpj: string,
    localization: string,
    email: string,
}