import DeleteDeliveryMan from '../../DeliveryMan/DeleteDeliveryMan.usecase';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import saveDeliveryMan from './CreateDeliveryMan.usecase.test';
import DeliveryManMongooseRepository from '../../../../infra/repository/mongoDB/repositories/DeliveryManMongooseRepository';
import GetAllDeliveryMans from '../../DeliveryMan/GetAllDeliveryMan.usecase';
config();

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