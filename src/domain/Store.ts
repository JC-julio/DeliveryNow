export default class Store {
    constructor(
        readonly name: string, readonly street: string, readonly number: string,
        readonly neighborhood: string, readonly CEP: string, readonly description: string, readonly cnpj: string,
        readonly localization: string, readonly email: string, readonly id: string, readonly password?: string,) {
    }

}