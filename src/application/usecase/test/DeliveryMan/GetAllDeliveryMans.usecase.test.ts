import DeleteDeliveryMan from '../../DeliveryMan/DeleteDeliveryMan.usecase';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import DeliveryManMongooseRepository from '../../../../infra/repository/mongoDB/repositories/DeliveryManMongooseRepository';
import GetAllDeliveryMans from '../../DeliveryMan/GetAllDeliveryMan.usecase';
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

test("Deve dar um GetAll de entregadores na api com sucesso", async() => {
    await mongoose.connect(process.env.connectionString);
    const newDeliveryMan =  await saveDeliveryMan();
    const newDeliveryMan1 =  await saveDeliveryMan();
    const repo = new GetAllDeliveryMans(new DeliveryManMongooseRepository())
    const getAllDeliveryMan = await repo.execute()
    const getDeliveryMan = getAllDeliveryMan.find((element) => (element.id) === newDeliveryMan.id)
    expect(getDeliveryMan.id).toBe(newDeliveryMan.id)
    const getDeliveryMan1 = getAllDeliveryMan.find((element) => (element.id) === newDeliveryMan1.id)
    expect(getDeliveryMan1.id).toBe(newDeliveryMan1.id)
}, 15000)