import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
export default class DeliveryMan {
    constructor(
        readonly name: string, readonly CPF: string, readonly email: string,
        readonly vehicle: string, readonly vehicleColor: string, readonly plate: string, readonly id: string, readonly password?: string) {
    }

    static async hashPassword(password: string) {
        return await bcrypt.hash(password, 6);
    }

    // static async validToken(token) {
    //     if(jwt.verify(token, process.env.secretJWTkey))
    //     return true;
    // }
}