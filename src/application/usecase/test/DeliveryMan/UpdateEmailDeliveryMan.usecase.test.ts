import mongoose from 'mongoose';
import * as faker from 'faker'
import { config } from 'dotenv';
import saveDeliveryMan from './CreateDeliveryMan.usecase.test';
import DeliveryManMongooseRepository from '../../../../infra/repository/mongoDB/repositories/DeliveryManMongooseRepository';
import UpdateEmailDeliveryMan from '../../DeliveryMan/UpdateEmailDeliveryMan.usecase';
import GetOneDeliveryMan from '../../DeliveryMan/GetOneDeliveryMan.usecase';
config();

test("Deve dar um update em um email de um entregador", async() => {
    await mongoose.connect(process.env.connectionString);
    const newEmail = faker.internet.email()
    const deliveryMan = await saveDeliveryMan()
    const repo = new UpdateEmailDeliveryMan(new DeliveryManMongooseRepository())
    const repoGetOne = new GetOneDeliveryMan(new DeliveryManMongooseRepository())
    await repo.execute({id: deliveryMan.id, email: newEmail})
    const getOneDeliveryMan = await repoGetOne.execute(deliveryMan.id)
    expect(getOneDeliveryMan.email).toBe(newEmail)
}, 15000)