import StoreRepositoryInterface from "../../repository/StoreRepositoryInterface";
import { Output } from "../../repository/StoreRepositoryInterface";


export default class GetOneStore {
    constructor(readonly repo: StoreRepositoryInterface) {}
    async execute(email: Input): Promise<Output> {
    const deliveryMan = await this.repo.GetOne(email)
    return deliveryMan
    }
}

export type Input = string