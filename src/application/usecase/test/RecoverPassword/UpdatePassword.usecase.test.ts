import mongoose from "mongoose";
import UpdatePassword from "../../RecoverPassword/UpdatePassword.usecase";
import updatePasswordMongooseRepository from "../../../../infra/repository/mongoDB/repositories/UpdatePasswordMongooseRepository";
import saveStore from "../Store/CreateStore.usecase.test";
import LoginUsecase from "../../login&Logout/Login.usecase";
import LoginAndLogoutMongooseRepository from "../../../../infra/repository/mongoDB/repositories/LoginAndLogoutMongooseRepository";
import saveDeliveryMan from "../DeliveryMan/CreateDeliveryMan.usecase.test";

test("deve testar o update de senha de um comércio", async() => {
    await mongoose.connect(process.env.connectionString);
    const store = await saveStore()
    const repo = new UpdatePassword(new updatePasswordMongooseRepository())
    await repo.execute({id: store.id, password: '123456789'})
    const repoLogin = new LoginUsecase(new LoginAndLogoutMongooseRepository())
    const token = await repoLogin.execute({email: store.email, password: '123456789'})
    expect(token).toBeDefined()
}, 15000)

test("deve testar o uptate de senha de um entregador", async() => {
    await mongoose.connect(process.env.connectionString);
    const deliveryMan = await saveDeliveryMan()
    const repo = new UpdatePassword(new updatePasswordMongooseRepository())
    await repo.execute({id: deliveryMan.id, password: '123456789'})
    const repoLogin = new LoginUsecase(new LoginAndLogoutMongooseRepository())
    const token = await repoLogin.execute({email: deliveryMan.email, password: '123456789'})
    expect(token).toBeDefined()
}, 15000)