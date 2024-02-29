import LoginAndLogoutMongooseRepository from "../../../../infra/repository/mongoDB/repositories/LoginAndLogoutMongooseRepository"
import LoginUsecase from "../../login&Logout/Login.usecase"
import saveDeliveryMan from "../DeliveryMan/CreateDeliveryMan.usecase.test"
import mongoose from "mongoose";
import saveStore from "../Store/CreateStore.usecase.test";

test("deve gerar um token de autorização para um entregador com sucesso", async() => {
    await mongoose.connect(process.env.connectionString);
    const deliveryMan = await saveDeliveryMan()
    const validInput = {
        email: deliveryMan.email,
        password: deliveryMan.password,
    }
    const repo = new LoginUsecase(new LoginAndLogoutMongooseRepository())
    const token = await repo.execute({...validInput})
    expect(token).toBeDefined()
}, 15000)

test("não deve fornecer um token para um usuário que não existe na database", async() => {
    await mongoose.connect(process.env.connectionString);
    const validInput = {
        email: 'emaildoseuze@gmail.com',
        password: 'eunaoseiasenha',
    }
    const repo = new LoginUsecase(new LoginAndLogoutMongooseRepository())
    expect(async() => await repo.execute({...validInput})).rejects.toThrow(new Error("usuário não encontrado"))
}, 15000)

test("deve gerar um token de autorização para um comércio com sucesso", async() => {
    await mongoose.connect(process.env.connectionString);
    const store = await saveStore()
    const validInput = {
        email: store.email,
        password: store.password,
    }
    const repo = new LoginUsecase(new LoginAndLogoutMongooseRepository())
    const token = await repo.execute({...validInput})
    expect(token).toBeDefined()
}, 15000)