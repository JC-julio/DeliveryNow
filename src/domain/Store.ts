import CNPJValidator from "./validators/CNPJValidator";

export default class Store {
    constructor(
        readonly name: string, readonly street: string, readonly number: string, readonly neighborhood: string,
        readonly CEP: string, readonly description: string, readonly cnpj: string, readonly localization: string) {}
    static create(props: storeDto) {
        if(!props)
            throw new Error("Dados faltantes")
        if(new CNPJValidator(props.cnpj))
        return new Store(
            props.name, props.street, props.number, props.neighborhood,
            props.CEP, props.description, props.cnpj, props.localization,
        )
    }
}

export type storeDto = {
    name: string;
    street: string;
    number: string;
    neighborhood: string;
    CEP: string;
    description:string;
    cnpj: string;
    localization: string;
}