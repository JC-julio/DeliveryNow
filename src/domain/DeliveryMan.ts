import CPFValidator from "./validators/CPFValidator";
import EMAILValidator from "./validators/EMAILValidator";

export default class DeliveryMan {
    document: CPFValidator
    Email: EMAILValidator
    constructor(
        readonly name: string, readonly CPF: string, readonly email: string,
        readonly vehicle: string, readonly vehicleColor: string, readonly plate: string) {
        this.document = new CPFValidator(CPF)
        this.Email = new EMAILValidator(email)
    }

    static create(name: string, CPF: string, email: string, vehicle: string, vehicleColor: string, plate: string) {
        return new DeliveryMan(name, CPF, email, vehicle, vehicleColor, plate)
    }   
}