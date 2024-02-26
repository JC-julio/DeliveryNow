import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export default class Store {
    constructor(
        readonly name: string, readonly street: string, readonly number: string,
        readonly neighborhood: string, readonly CEP: string, readonly description: string, readonly cnpj: string,
        readonly localization: string, readonly email: string, readonly id: string, readonly password?: string,) {
    }
    static async hashPassword(password: string) {
        return await bcrypt.hash(password, 6);
    }

    // static async generateToken(storeId) {
    //     const token = await jwt.sign({storeId: storeId}, process.env.secretJWTkey, {expiresIn: '7d'});
    //     return token;
    // }

    // static async validToken(token) {
    //     if(jwt.verify(token, process.env.secretJWTkey))
    //     return true;
    // }
}