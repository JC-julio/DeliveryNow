import StoreRepositoryInterface from "../../repository/StoreRepositoryInterface";
import { Output } from "../../repository/StoreRepositoryInterface";


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
