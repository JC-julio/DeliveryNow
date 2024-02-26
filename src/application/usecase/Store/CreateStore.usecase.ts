import StoreRepositoryInterface from "../../repository/StoreRepositoryInterface";
import Store from "../../../domain/Store";
import EMAILValidator from "../../../domain/validators/EMAILValidator";
import CNPJValidator from "../../../domain/validators/CNPJValidator";

export default class CreateStore {
    constructor(readonly repo: StoreRepositoryInterface) {}
    async execute(props: Input): Promise<Output> {
        if(await this.repo.GetbyEmail(props.email))
            throw new Error("Email já cadastrado")
        const password = await Store.hashPassword(props.password);
        (new EMAILValidator(props.email));
        (new CNPJValidator(props.cnpj));
        const repoStore = await this.repo.save({
            ...props,
            password: password
        })
        const store = new Store(repoStore.name, repoStore.street, repoStore.number, repoStore.neighborhood, repoStore.CEP, repoStore.description, repoStore.cnpj, repoStore.localization, repoStore.email, repoStore.id)
        return store
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