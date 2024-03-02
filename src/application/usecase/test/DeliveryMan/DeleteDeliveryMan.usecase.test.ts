import DeleteDeliveryMan from '../../DeliveryMan/DeleteDeliveryMan.usecase';
import GetOneDeliveryMan from '../../DeliveryMan/GetOneDeliveryMan.usecase';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import DeliveryManMongooseRepository from '../../../../infra/repository/mongoDB/repositories/DeliveryManMongooseRepository';
config();

import * as faker from 'faker'
import { cpf } from 'cpf-cnpj-validator';
import CreateDeliveryMan from '../../DeliveryMan/CreateDeliveryMan.usecase';
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

test("deve deletar um novo entregador", async() => {
    await mongoose.connect(process.env.connectionString);
    const deliveryMan = await saveDeliveryMan()
    const repo = new DeleteDeliveryMan(new DeliveryManMongooseRepository())
    await repo.execute(deliveryMan.id)
    const repoGetOne = new GetOneDeliveryMan(new DeliveryManMongooseRepository())
    expect(async() => repoGetOne.execute(deliveryMan.id)).rejects.toThrow(new Error("nenhum usuário encontrado"))
}, 15000)