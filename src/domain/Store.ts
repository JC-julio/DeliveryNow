import CNPJValidator from "./validators/CNPJValidator";

export default class Store {
    constructor(
        readonly name: string, readonly street: string, readonly number: string, readonly neighborhood: string,
        readonly CEP: string, readonly description: string, readonly cnpj: string, readonly localization: string) {}
    static create(storeDto) {
        if(!storeDto)
            throw new Error("Dados faltantes")
        if(new CNPJValidator(storeDto.cnpj))
        return new Store(
            storeDto.name, storeDto.street, storeDto.number, storeDto.neighborhood,
            storeDto.CEP, storeDto.description, storeDto.cnpj, storeDto.localization,
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