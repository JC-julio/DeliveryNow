import mongoose from 'mongoose';
import StoreMongooseRepository from '../../../../infra/repository/mongoDB/repositories/StoreMongooseRepository';
import saveStore from './CreateStore.usecase.test';
import { config } from 'dotenv';
import GetbyEmailStore from '../../Store/GetbyEmailStore.usecase';
config();

test("Deve selecionar um comércio pelo email", async() => {
    await mongoose.connect(process.env.connectionString);
    const store = await saveStore()
    const repo = new GetbyEmailStore(new StoreMongooseRepository())
    const getStore = await repo.execute(store.email)
    expect(getStore.email).toBe(store.email)
}, 15000)