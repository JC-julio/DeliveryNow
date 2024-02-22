import StoreRepositoryInterface from "../../repository/StoreRepositoryInterface";

export default class GetAllStores {
    constructor(readonly repo: StoreRepositoryInterface) {}
    async execute(): Promise<Output[]>{
        const deliveryMans = (await this.repo.GetAll()).map((store) => {
        return {
            name: store.name,
            id: store.id,
            street: store.street,
            number: store.number,
            neighborhood: store.neighborhood,
            CEP: store.CEP,
            description: store.description,
            cnpj: store.cnpj,
            localization: store.localization,
            email: store.email,
        }})
        return deliveryMans
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