import StoreRepositoryInterface, { Output } from "../../repository/StoreRepositoryInterface"
import Store from "../../../domain/Store"

export default class LoginStore {
    constructor(
        readonly repoStore: StoreRepositoryInterface) {}
    async execute(props: Input): Promise<any> {
        const getStore = await this.repoStore.GetbyEmail(props.email)
        if(!getStore)
            throw new Error("nenhum usuário encontrado")
        const store = Store.create(
            getStore.name, getStore.password, getStore.street,
            getStore.number, getStore.neighborhood, getStore.CEP,
            getStore.description, getStore.cnpj, getStore.localization,
            getStore.email)
        if(!await store.validPassword(getStore.password))
            throw new Error("Senha incorreta!")
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
