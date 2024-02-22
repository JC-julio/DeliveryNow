import StoreRepositoryInterface from "../../repository/StoreRepositoryInterface";


export default class GetbyEmailStore {
    constructor(readonly repo: StoreRepositoryInterface) {}
    async execute(email: Input): Promise<any> {
    const store = await this.repo.GetbyEmail(email)
    return store
    }
}

export type Input = string

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