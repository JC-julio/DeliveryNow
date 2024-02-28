import mongoose from 'mongoose';
import StoreMongooseRepository from '../../../../infra/repository/mongoDB/repositories/StoreMongooseRepository';
import saveStore from './CreateStore.usecase.test';
import DeleteStore from '../../Store/DeleteStore.usecase';
import GetOneStore from '../../Store/GetOneStore.usecase';
import { config } from 'dotenv';
import GetAllStores from '../../Store/GetAllStores.usecase';
config();

test("deve testar o getAll de comércios", async() => {
    await mongoose.connect(process.env.connectionString);
    const store = await saveStore()
    const store1 = await saveStore()
    const repo = new GetAllStores(new StoreMongooseRepository())
    const getAllStores = await repo.execute()
    const getStore = getAllStores.find((element) => (element.id) === store.id)
    expect(getStore.id).toBe(store.id)
    const getStore1 = getAllStores.find((element) => (element.id) === store1.id)
    expect(getStore1.id).toBe(store1.id)
}, 15000) 