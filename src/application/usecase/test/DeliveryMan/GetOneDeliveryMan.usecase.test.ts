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

test("Deve selecionar um entregador com base em eu ID", async() => {
    await mongoose.connect(process.env.connectionString);
    const deliveryMan = await saveDeliveryMan()
    const repo = new GetOneDeliveryMan(new DeliveryManMongooseRepository())
    const getDeliveryMan = await repo.execute(deliveryMan.id)
    expect(getDeliveryMan.id).toBe(deliveryMan.id)
}, 15000)