import LoginAndLogoutRepositoryInterface from "../../../../application/repository/LoginAndLogoutRepositoryInterface";
import tokenModel from "../models/MongosseModelLogout";
import deliveryManModel from "../models/MongooseModelDeliveryMan";
import storeModel from "../models/mongooseModelStore";
export default class LoginAndLogoutMongooseRepository implements LoginAndLogoutRepositoryInterface {
    model = tokenModel
    modelDeliveryMan = deliveryManModel
    modelStore = storeModel
    async save(token: string): Promise<any> {
        const returntoken = await this.model.create({
            token: token
        })
        return returntoken
    }
}