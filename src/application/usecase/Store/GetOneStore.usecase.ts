import StoreRepositoryInterface from "../../repository/StoreRepositoryInterface";
export default class GetOneStore {
    constructor(readonly repo: StoreRepositoryInterface) {}
    async execute(id: Input): Promise<Output> {
    const deliveryMan = await this.repo.GetOne(id)
    return deliveryMan
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