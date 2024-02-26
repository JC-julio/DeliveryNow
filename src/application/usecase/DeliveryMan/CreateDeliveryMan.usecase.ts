import DeliveryManRepositoryInterface from "../../repository/DeliveryManRepositoryInterface";
import DeliveryMan from "../../../domain/DeliveryMan";
import CPFValidator from "../../../domain/validators/CPFValidator";
import EMAILValidator from "../../../domain/validators/EMAILValidator";
import * as bcrypt from 'bcrypt';

export default class CreateDeliveryMan {
    constructor(readonly repo: DeliveryManRepositoryInterface) {}
    async execute(props: Input): Promise<Output> {
        if(await this.repo.GetByEmail(props.email))
            throw new Error("Email já cadastrado")
        const password = await this.hashPassword(props.password);
        (new CPFValidator(props.CPF));
        (new EMAILValidator(props.email));
        const repoDeliveryMan = await this.repo.save({
            ...props,
            password: password,
        })
        const deliveryMan = new DeliveryMan(
            repoDeliveryMan.name, repoDeliveryMan.password, repoDeliveryMan.CPF,
            repoDeliveryMan.email, repoDeliveryMan.vehicle, repoDeliveryMan.vehicleColor,
            repoDeliveryMan.plate, repoDeliveryMan.id)
        return deliveryMan
    }

    async hashPassword(password: string) {
        return await bcrypt.hash(password, 6);
    }
}


export type Input = {
    name: string,
    CPF: string,
    email: string,
    vehicle: string,
    vehicleColor: string,
    plate: string,
    password: string,
}

export type Output = {
    id: string,
    name: string,
    CPF: string,
    email: string,
    vehicle: string,
    vehicleColor: string,
    plate: string,
}