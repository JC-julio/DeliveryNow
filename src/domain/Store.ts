import CNPJValidator from "./validators/CNPJValidator";
import EMAILValidator from "./validators/EMAILValidator";

export default class Store {
    document: CNPJValidator
    Email: EMAILValidator
    constructor(
        readonly name: string, readonly street: string, readonly number: string, readonly neighborhood: string,
        readonly CEP: string, readonly description: string, readonly cnpj: string, readonly localization: string,
        readonly email: string) {
            this.document = new CNPJValidator(cnpj)
            this.Email = new EMAILValidator(email)
        }
    static create(name: string, street: string, number: string, neighborhood: string, CEP: string, description: string, cnpj: string, localization: string, email) {
        return new Store(
            name, street, number, neighborhood, CEP, description, cnpj, localization, email
        )
    }
}