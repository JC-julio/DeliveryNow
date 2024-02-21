import DeliveryManRepositoryInterface from "../../repository/DeliveryManRepositoryInterface";
import DeliveryMan from "../../../domain/DeliveryMan";
import { Output } from "../../repository/DeliveryManRepositoryInterface";

export default class CreateDeliveryMan {
    constructor(readonly repo: DeliveryManRepositoryInterface) {}
    async execute(props: Input): Promise<Output> {
        if(await this.repo.GetOne(props.email))
            throw new Error("Email já cadastrado")
        const deliveryMan = DeliveryMan.create(
            props.name, props.password, props.CPF,
            props.email, props.vehicle, props.vehicleColor,
            props.plate)
        await this.repo.save(deliveryMan)
        return deliveryMan
    }
}

export type Input = {
    name: string,
    password: string,
    CPF: string,
    email: string,
    vehicle: string,
    vehicleColor: string,
    plate: string,
}
