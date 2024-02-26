import UpdatePasswordRepositoryInterfaces from "../../../../application/repository/UpdatePasswordRepositoryInterfaces";
import deliveryManModel from "../models/MongooseModelDeliveryMan";
import storeModel from "../models/mongooseModelStore";

export default class updatePasswordMongooseRepository implements UpdatePasswordRepositoryInterfaces {
    modelDeliveryMan = deliveryManModel
    modelStore = storeModel

    async GetByEmail(email: string): Promise<any> {
        const store = await this.modelStore.findOne({email: email})
        if(store)
            return store
        const deliveryMan = await this.modelDeliveryMan.findOne({email: email})
        if(deliveryMan)
            return deliveryMan
        else
        throw new Error("nenhum usuário encontrado!")
    }

    async updatePassword(id: string, password: string): Promise<void> {
        if(await this.modelDeliveryMan.findById(id)) {
            await this.modelDeliveryMan.findByIdAndUpdate(id, {password: password})
        } else if(await this.modelStore.findById(id)) {
            await this.modelStore.findByIdAndUpdate(id, {password: password})
        } else {
            throw new Error("nenhum usuário encontrado")
        }
    }
}