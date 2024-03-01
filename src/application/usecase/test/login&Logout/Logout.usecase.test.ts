import mongoose from "mongoose";
import { config } from 'dotenv';
import saveDeliveryMan from "../DeliveryMan/CreateDeliveryMan.usecase.test";
import LoginUsecase from "../../login&Logout/Login.usecase";
import LoginAndLogoutMongooseRepository from "../../../../infra/repository/mongoDB/repositories/LoginAndLogoutMongooseRepository";
import Logout from "../../login&Logout/Logout.usecase";
config();

test("deve persistir um novo token na blacklist", async() => {
    await mongoose.connect(process.env.connectionString);
    const deliveryMan = await saveDeliveryMan()
    const validInput = {
        email: deliveryMan.email,
        password: deliveryMan.password,
    }
    const repo = new LoginUsecase(new LoginAndLogoutMongooseRepository())
    const deliveryManData = await repo.execute({...validInput})
    const repoLogout = new Logout(new LoginAndLogoutMongooseRepository())
    await repoLogout.execute({token: deliveryManData.token})
}, 15000)