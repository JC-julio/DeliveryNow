import DeliveryManRepositoryInterface, { Output } from "../../repository/DeliveryManRepositoryInterface"
import DeliveryMan from "../../../domain/DeliveryMan"
export default class LoginDeliveryMan {
    constructor(
        readonly repo: DeliveryManRepositoryInterface) {}
    async execute(props: Input): Promise<any> {
        const getDeliveryMan = await this.repo.GetByEmail(props.email)
        if(!getDeliveryMan)
            throw new Error("nenhum usuário encontrado")
        const deliveryMan = DeliveryMan.create(
            getDeliveryMan.name, getDeliveryMan.password, getDeliveryMan.CPF,
            getDeliveryMan.email, getDeliveryMan.vehicle, getDeliveryMan.vehicleColor,
            getDeliveryMan.plate)
        if(!await deliveryMan.validPassword(getDeliveryMan.password))
            throw new Error("Senha incorreta!")
        const token = await DeliveryMan.generateToken(getDeliveryMan.id)
        const ObjectReturn = {
            name: getDeliveryMan.name,
            id: getDeliveryMan.id,
            CPF: getDeliveryMan.CPF,
            email: getDeliveryMan.email,
            vehicle: getDeliveryMan.vehicle,
            vehicleColor: getDeliveryMan.vehicleColor,
            plate: getDeliveryMan.plate,
            token: token,
        }
        return ObjectReturn
    }
}

export type Input = {
    email: string,
    password: string,
}
