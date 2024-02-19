import CPFValidator from "./CPFValidator";
import EMAILValidator from "./EMAILValidator";

export default class DeliveryMan {
    constructor(
        readonly name: string, readonly CPF: string, readonly email: string,
        readonly vehicle: string, readonly vehicleColor: string, readonly plate: string) {}
    static create(props: deliveryManDto) {
        if(new CPFValidator(props.CPF))
        if(new EMAILValidator(props.email))
            throw new Error("Email inválido")
        return new DeliveryMan(
            props.name, props.CPF, props.email,
            props.vehicle, props.vehicleColor, props.plate,
        )
    }
}

export type deliveryManDto = {
    name: string;
    CPF: string;
    email: string;
    vehicle: string;
    vehicleColor: string;
    plate: string;
}