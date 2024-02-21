import LoginRepositoryInterface from "../../repository/LoginRepositoryInterface"
import StoreRepositoryInterface from "../../repository/StoreRepositoryInterface"
import Store from "../../../domain/Store"

export default class CreateStore {
    constructor(
        readonly repoLogin: LoginRepositoryInterface,
        readonly repoStore: StoreRepositoryInterface) {}
    async execute(props: Input): Promise<any> {
        const getStore = await this.repoStore.GetOne(props.email)
        if(!getStore)
            throw new Error("Email já cadastrado")
        const token = await Store.generateToken(getStore.id)
        const ObjectReturn = {
            name: getStore.name,
            id: getStore.id,
            street: getStore.street,
            number: getStore.number,
            neighborhood: getStore.neighborhood,
            CEP: getStore.CEP,
            description: getStore.description,
            cnpj: getStore.cnpj,
            localization: getStore.localization,
            email: getStore.email,
            token: token,
        }
        return ObjectReturn
    }
}

export type Input = {
    email: string,
    password: string,
}