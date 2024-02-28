import mongoose from 'mongoose';
import * as faker from 'faker'
import { config } from 'dotenv';
import saveDeliveryMan from './CreateDeliveryMan.usecase.test';
import DeliveryManMongooseRepository from '../../../../infra/repository/mongoDB/repositories/DeliveryManMongooseRepository';
import GetOneDeliveryMan from '../../DeliveryMan/GetOneDeliveryMan.usecase';
import UpdateNameDeliveryMan from '../../DeliveryMan/UpdateNameDeliveryMan.usecase';
config();

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