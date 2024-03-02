import mongoose from 'mongoose';
import { config } from 'dotenv';
import DeliveryManMongooseRepository from '../../../../infra/repository/mongoDB/repositories/DeliveryManMongooseRepository';
import GetOneDeliveryMan from '../../DeliveryMan/GetOneDeliveryMan.usecase';
import UpdateNameDeliveryMan from '../../DeliveryMan/UpdateNameDeliveryMan.usecase';
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

test("Deve dar um update em um email de um entregador", async() => {
    await mongoose.connect(process.env.connectionString);
    const newName = 'julio de novo'
    const deliveryMan = await saveDeliveryMan()
    const repo = new UpdateNameDeliveryMan(new DeliveryManMongooseRepository())
    const repoGetOne = new GetOneDeliveryMan(new DeliveryManMongooseRepository())
    await repo.execute({id: deliveryMan.id, name: newName})
    const getOneDeliveryMan = await repoGetOne.execute(deliveryMan.id)
    expect(getOneDeliveryMan.name).toBe(newName)
}, 15000)