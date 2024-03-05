import mongoose from 'mongoose';
import { config } from 'dotenv';
import DeliveryManMongooseRepository from '../../../../infra/repository/mongoDB/repositories/DeliveryManMongooseRepository';
import GetbyEmailDeliveryMan from '../../DeliveryMan/GetByEmailDeliveryMan.usecase';
config();

import * as faker from 'faker'
import { cpf } from 'cpf-cnpj-validator';
import CreateDeliveryMan from "../../DeliveryMan/CreateDeliveryMan";
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

test("Deve selecionar um entregador com base em seu email", async() => {
    await mongoose.connect(process.env.connectionString);
    const newDeliveryMan = await saveDeliveryMan()
    const repo = new GetbyEmailDeliveryMan(new DeliveryManMongooseRepository())
    const getDeliveryMan = await repo.execute(newDeliveryMan.email)
    expect(getDeliveryMan.id).toBeDefined()
}, 15000)