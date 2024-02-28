import DeleteDeliveryMan from '../../DeliveryMan/DeleteDeliveryMan.usecase';
import GetOneDeliveryMan from '../../DeliveryMan/GetOneDeliveryMan.usecase';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import saveDeliveryMan from './CreateDeliveryMan.usecase.test';
import DeliveryManMongooseRepository from '../../../../infra/repository/mongoDB/repositories/DeliveryManMongooseRepository';
config();

test("deve deletar um novo entregador", async() => {
    await mongoose.connect(process.env.connectionString);
    const deliveryMan = await saveDeliveryMan()
    const repo = new DeleteDeliveryMan(new DeliveryManMongooseRepository())
    await repo.execute(deliveryMan.id)
    const repoGetOne = new GetOneDeliveryMan(new DeliveryManMongooseRepository())
    expect(async() => repoGetOne.execute(deliveryMan.id)).rejects.toThrow(new Error("nenhum usuário encontrado"))
}, 15000)