import * as faker from 'faker'
import { cpf } from 'cpf-cnpj-validator';

import CreateDeliveryMan from '../../DeliveryMan/CreateDeliveryMan.usecase'
import DeliveryManMongooseRepository from '../../../../infra/repository/mongoDB/repositories/DeliveryManMongooseRepository'


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
    const repo = new CreateDeliveryMan(new DeliveryManMongooseRepository())
    const returnDeliveryMan = await repo.execute(validInput)
    expect(returnDeliveryMan).toBeDefined()
}, 15000)