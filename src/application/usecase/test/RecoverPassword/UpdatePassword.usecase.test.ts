import mongoose from "mongoose";
import UpdatePassword from "../../RecoverPassword/UpdatePassword.usecase";
import updatePasswordMongooseRepository from "../../../../infra/repository/mongoDB/repositories/UpdatePasswordMongooseRepository";
import LoginUsecase from "../../login&Logout/Login.usecase";
import LoginAndLogoutMongooseRepository from "../../../../infra/repository/mongoDB/repositories/LoginAndLogoutMongooseRepository";
import CreateDeliveryMan from "../../DeliveryMan/CreateDeliveryMan.usecase";
import { cpf, cnpj } from "cpf-cnpj-validator";
import DeliveryManMongooseRepository from "../../../../infra/repository/mongoDB/repositories/DeliveryManMongooseRepository";
import StoreMongooseRepository from "../../../../infra/repository/mongoDB/repositories/StoreMongooseRepository";
import CreateStore from "../../Store/CreateStore.usecase";
import * as faker from 'faker'

async function saveDeliveryMan() {
    const validInput = {
        name: 'Júlio César Aguiar',
        email: faker.internet.email(),
        CPF: cpf.generate(),
        vehicle: 'titan start 125cc',
        vehicleColor: 'preta',
        plate: 'abc-1234',
        password: '12345678'
    }
    await mongoose.connect(process.env.connectionString);
    const repo = new CreateDeliveryMan(new DeliveryManMongooseRepository())
    const returnDeliveryMan = await repo.execute(validInput)
    return {
        ...returnDeliveryMan,
        password: validInput.password
    }
}

async function saveStore() {
    const validInput = {
        name: 'loja do seu zé',
        password: '12345678',
        street: 'rua 1',
        number: '401',
        neighborhood: 'bairro do seu zé',
        CEP: '72507-241',
        description: 'comércio de bebidas',
        cnpj: cnpj.generate(),
        localization: '-13.655173, -59.791912',
        email: faker.internet.email()
    }
    await mongoose.connect(process.env.connectionString);
    const repo = new CreateStore(new StoreMongooseRepository())
    const store = await repo.execute(validInput)
    return {
        ...store,
        password: validInput.password
    }
}

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