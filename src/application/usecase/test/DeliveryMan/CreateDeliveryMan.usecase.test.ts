import mongoose from 'mongoose';
import CreateDeliveryMan from "../../DeliveryMan/CreateDeliveryMan";
import DeliveryManMongooseRepository from '../../../../infra/repository/mongoDB/repositories/DeliveryManMongooseRepository'
import * as faker from 'faker'
import { cpf } from 'cpf-cnpj-validator';
import { config } from 'dotenv';
config();

test("deve criar um novo entregador", async() => {
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
    expect(returnDeliveryMan.id).toBeDefined()
}, 15000)