import StoreRepositoryInterface from "../../repository/StoreRepositoryInterface";
import { Output } from "../../repository/StoreRepositoryInterface";
import Store from "../../../domain/Store";

export default class CreateStore {
    constructor(readonly repo: StoreRepositoryInterface) {}
    async execute(props: Input): Promise<Output> {
        if(await this.repo.GetOne(props.email))
            throw new Error("Email já cadastrado")
        const password = await Store.hashPassword(props.password)
        const store = await Store.create(
            props.name, password, props.street,
            props.number, props.neighborhood, props.CEP,
            props.description, props.cnpj, props.localization,
            props.email)
        const returnStore = await this.repo.save(store)
        return returnStore
    }
}

export type Input = {
    name: string,
    password: string,
    street: string,
    number: string,
    neighborhood: string,
    CEP: string,
    description: string,
    cnpj: string,
    localization: string,
    email: string,
}