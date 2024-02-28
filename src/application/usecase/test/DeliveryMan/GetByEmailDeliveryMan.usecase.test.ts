import DeleteDeliveryMan from '../../DeliveryMan/DeleteDeliveryMan.usecase';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import saveDeliveryMan from './CreateDeliveryMan.usecase.test';
import DeliveryManMongooseRepository from '../../../../infra/repository/mongoDB/repositories/DeliveryManMongooseRepository';
import GetbyEmailDeliveryMan from '../../DeliveryMan/GetByEmailDeliveryMan.usecase';
config();

test("Deve selecionar um entregador com base em seu email", async() => {
    await mongoose.connect(process.env.connectionString);
    const newDeliveryMan = await saveDeliveryMan()
    const repo = new GetbyEmailDeliveryMan(new DeliveryManMongooseRepository())
    const getDeliveryMan = await repo.execute(newDeliveryMan.email)
}, 15000)