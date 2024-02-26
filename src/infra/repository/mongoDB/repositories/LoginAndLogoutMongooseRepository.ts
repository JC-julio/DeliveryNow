import LoginAndLogoutRepositoryInterface from "../../../../application/repository/LoginAndLogoutRepositoryInterface";
import tokenModel from "../models/MongosseModelLogout";
import deliveryManModel from "../models/MongooseModelDeliveryMan";
import storeModel from "../models/mongooseModelStore";
export default class LoginAndLogoutMongooseRepository implements LoginAndLogoutRepositoryInterface{
    model = tokenModel
    modelDeliveryMan = deliveryManModel
    modelStore = storeModel
    async save(token: string): Promise<void> {
        await this.model.create({
            token: token
        })
    }
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
}