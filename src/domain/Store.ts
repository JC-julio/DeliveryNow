import CNPJValidator from "./validators/CNPJValidator";
import EMAILValidator from "./validators/EMAILValidator";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export default class Store {
    document: CNPJValidator
    Email: EMAILValidator
    constructor(
        readonly name: string, readonly password: string, readonly street: string, readonly number: string,
        readonly neighborhood: string, readonly CEP: string, readonly description: string, readonly cnpj: string,
        readonly localization: string, readonly email: string) {
            this.document = new CNPJValidator(cnpj)
            this.Email = new EMAILValidator(email)
    }
    
    static create(name: string, password: string, street: string, number: string, neighborhood: string, CEP: string, description: string, cnpj: string, localization: string, email) {
        return new Store(
            name, password, street, number, neighborhood, CEP, description, cnpj, localization, email
        )
    }

    static async hashPassword(password: string) {
        return await bcrypt.hash(password, 6);
    }

    public async validPassword(password) {
        const passwordIsValid = await bcrypt.compare(this.password, password)
        if(!passwordIsValid){
          throw new Error("Senha incorreta!")
          }
        return true;
    }

    static async generateToken(storeId) {
        const token = await jwt.sign({storeId: storeId}, process.env.secretJWTkey, {expiresIn: '7d'});
        return token;
    }

    static async validToken(token) {
        if(jwt.verify(token, process.env.secretJWTkey))
        return true;
    }
}