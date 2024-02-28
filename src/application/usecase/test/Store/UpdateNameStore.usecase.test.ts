import mongoose from 'mongoose';
import StoreMongooseRepository from '../../../../infra/repository/mongoDB/repositories/StoreMongooseRepository';
import * as faker from 'faker'
import saveStore from './CreateStore.usecase.test';
import { config } from 'dotenv';
import GetOneStore from '../../Store/GetOneStore.usecase';
import UpdateNameStore from '../../Store/UpdateNameStore';
config();

test("deve atualizar o nome de um comércio", async()=> {
    await mongoose.connect(process.env.connectionString);
    const store = await saveStore()
    const repo = new UpdateNameStore(new StoreMongooseRepository)
    const repoGetOne = new GetOneStore(new StoreMongooseRepository)
    await repo.execute({id: store.id, name: 'essa loja teve seu nome atualizado'})
    const getOneStore = await repoGetOne.execute(store.id)
    expect(getOneStore.name).toBe('essa loja teve seu nome atualizado')
}, 15000)