import StoreRepositoryInterface from "../../repository/StoreRepositoryInterface";
import Store from "../../../domain/Store";
import * as bcrypt from 'bcrypt';
import EMAILValidator from "../../../domain/validators/EMAILValidator";
import CNPJValidator from "../../../domain/validators/CNPJValidator";
import ServiceRepositoryinterface from "../../repository/Service/ServiceRepositoryInterface";

export default class CreateStore {
    constructor(
        readonly repo: StoreRepositoryInterface,
        readonly service: ServiceRepositoryinterface,
        ) {}
    async execute(props: Input): Promise<Output> {
        if(await this.service.GetByEmail(props.email))
            throw new Error("Email já cadastrado")
        if(await this.repo.GetbyCNPJ(props.cnpj))
            throw new Error("CNPJ já cadastrado, entre em contato com o suporte para mais informações")
        const password = await this.hashPassword(props.password);
        (new EMAILValidator(props.email));
        (new CNPJValidator(props.cnpj));
        const repoStore = await this.repo.save({
            ...props,
            password: password
        })
        const store = new Store(repoStore.name, repoStore.street, repoStore.number, repoStore.neighborhood, repoStore.CEP, repoStore.description, repoStore.cnpj, repoStore.localization, repoStore.email, repoStore.id)
        return store
    }
    async hashPassword(password: string) {
        return await bcrypt.hash(password, 6);
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