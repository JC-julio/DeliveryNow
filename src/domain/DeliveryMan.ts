import CPFValidator from "./validators/CPFValidator";
import EMAILValidator from "./validators/EMAILValidator";

export default class DeliveryMan {
    constructor(
        readonly name: string, readonly CPF: string, readonly email: string,
        readonly vehicle: string, readonly vehicleColor: string, readonly plate: string) {}
    static create(props: deliveryManDto) {
        if(!props)
            throw new Error("Dados Faltantes")
        if(new CPFValidator(props.CPF))
        if(new EMAILValidator(props.email))
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