import StoreRepositoryInterface from "../../repository/StoreRepositoryInterface";
import { Output } from "../../repository/StoreRepositoryInterface";


export default class GetOneStore {
    constructor(readonly repo: StoreRepositoryInterface) {}
    async execute(id: Input): Promise<Output> {
    const deliveryMan = await this.repo.GetOne(id)
    return deliveryMan
    }
}

export type Input = string