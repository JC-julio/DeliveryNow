import LoginAndLogoutMongooseRepository from "../../../../infra/repository/mongoDB/repositories/LoginAndLogoutMongooseRepository"
import LoginUsecase from "../../login&Logout/Login.usecase"
import mongoose from "mongoose";
import * as faker from 'faker'
import { cnpj } from 'cpf-cnpj-validator';
import { cpf } from 'cpf-cnpj-validator';
import CreateDeliveryMan from "../../DeliveryMan/CreateDeliveryMan";
import DeliveryManMongooseRepository from "../../../../infra/repository/mongoDB/repositories/DeliveryManMongooseRepository";
import { config } from 'dotenv';
import CreateStore from "../../Store/CreateStore.usecase";
import StoreMongooseRepository from "../../../../infra/repository/mongoDB/repositories/StoreMongooseRepository";
config();

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