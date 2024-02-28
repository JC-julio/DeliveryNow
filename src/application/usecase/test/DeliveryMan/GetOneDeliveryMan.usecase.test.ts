import GetOneDeliveryMan from '../../DeliveryMan/GetOneDeliveryMan.usecase';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import saveDeliveryMan from './CreateDeliveryMan.usecase.test';
import DeliveryManMongooseRepository from '../../../../infra/repository/mongoDB/repositories/DeliveryManMongooseRepository';
config();

test("Deve selecionar um entregador com base em eu ID", async() => {
    await mongoose.connect(process.env.connectionString);
    const deliveryMan = await saveDeliveryMan()
    const repo = new GetOneDeliveryMan(new DeliveryManMongooseRepository())
    const getDeliveryMan = await repo.execute(deliveryMan.id)
    expect(getDeliveryMan.id).toBe(deliveryMan.id)
}, 15000)