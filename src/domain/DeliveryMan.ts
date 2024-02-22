import CPFValidator from "./validators/CPFValidator";
import EMAILValidator from "./validators/EMAILValidator";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
export default class DeliveryMan {
    document: CPFValidator
    Email: EMAILValidator
    constructor(
        readonly name: string, readonly password: string, readonly CPF: string, readonly email: string,
        readonly vehicle: string, readonly vehicleColor: string, readonly plate: string) {
        this.document = new CPFValidator(CPF)
        this.Email = new EMAILValidator(email)
    }

    static create(name: string, password:string, CPF: string, email: string, vehicle: string, vehicleColor: string, plate: string) {
        return new DeliveryMan(name, password, CPF, email, vehicle, vehicleColor, plate)
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