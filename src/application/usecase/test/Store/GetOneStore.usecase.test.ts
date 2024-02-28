import mongoose from 'mongoose';
import StoreMongooseRepository from '../../../../infra/repository/mongoDB/repositories/StoreMongooseRepository';
import saveStore from './CreateStore.usecase.test';
import { config } from 'dotenv';
import GetOneStore from '../../Store/GetOneStore.usecase';
config();

test("deve selecionar um comércio a partir do seu ID", async() => {
    await mongoose.connect(process.env.connectionString);
    const store = await saveStore()
    const repo = new GetOneStore(new StoreMongooseRepository())
    const getOneStore = await repo.execute(store.id)
    expect(getOneStore.id).toBe(store.id)
}, 15000)