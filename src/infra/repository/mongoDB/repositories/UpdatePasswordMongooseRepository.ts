import UpdatePasswordRepositoryInterfaces from "../../../../application/repository/UpdatePasswordRepositoryInterfaces";
import deliveryManModel from "../models/MongooseModelDeliveryMan";
import storeModel from "../models/mongooseModelStore";

export default class updatePasswordMongooseRepository implements UpdatePasswordRepositoryInterfaces {
    modelDeliveryMan = deliveryManModel
    modelStore = storeModel

    async GetByEmail(email: string): Promise<any> {
    const store = await this.modelStore.findOne({email: email})
    if(store)
        return {
            name: store.name,
            password: store.password,
            id: store.id,
            street: store.street,
            number: store.number,
            neighborhood: store.neighborhood,
            CEP: store.CEP,
            description: store.description,
            cnpj: store.cnpj,
            localization: store.localization,
            email: store.email,
        }
    const deliveryMan = await this.modelDeliveryMan.findOne({email: email})
    if(deliveryMan)
        return {
            name: deliveryMan.name,
            password: deliveryMan.password,
            id: deliveryMan.id,
            CPF: deliveryMan.CPF,
            email: deliveryMan.email,
            vehicle: deliveryMan.vehicle,
            vehicleColor: deliveryMan.vehicleColor,
            plate: deliveryMan.plate
        }
}

    async updatePassword(id: string, password: string): Promise<void> {
        if(await this.modelDeliveryMan.findById(id)) {
            await this.modelDeliveryMan.findByIdAndUpdate(id, {password: password})
        } else if(await this.modelStore.findById(id)) {
            await this.modelStore.findByIdAndUpdate(id, {password: password})
        }
    }
}