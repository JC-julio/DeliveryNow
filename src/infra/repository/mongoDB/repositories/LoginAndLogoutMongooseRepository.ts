import LoginAndLogoutRepositoryInterface from "../../../../application/repository/LoginAndLogoutRepositoryInterface";
import tokenModel from "../models/MongosseModelLogout";
import deliveryManModel from "../models/MongooseModelDeliveryMan";
import storeModel from "../models/mongooseModelStore";
export default class LoginAndLogoutMongooseRepository implements LoginAndLogoutRepositoryInterface{
    model = tokenModel
    modelDeliveryMan = deliveryManModel
    modelStore = storeModel
    async save(token: string): Promise<any> {
        const returntoken = await this.model.create({
            token: token
        })
        return returntoken
    }
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
}