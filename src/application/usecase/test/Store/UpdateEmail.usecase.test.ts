import mongoose from 'mongoose';
import StoreMongooseRepository from '../../../../infra/repository/mongoDB/repositories/StoreMongooseRepository';
import * as faker from 'faker'
import saveStore from './CreateStore.usecase.test';
import { config } from 'dotenv';
import GetOneStore from '../../Store/GetOneStore.usecase';
import UpdateEmailStore from '../../Store/UpdateEmailStore.usecase';
config();

test("deve atualizar o email de um comércio com sucesso", async()=> {
    await mongoose.connect(process.env.connectionString);
    const newEmail = faker.internet.email()
    const store = await saveStore()
    const repo = new UpdateEmailStore(new StoreMongooseRepository())
    const repoGetOne = new GetOneStore(new StoreMongooseRepository)
    await repo.execute({id: store.id, email: newEmail})
    const getOneStore = await repoGetOne.execute(store.id)
    expect(getOneStore.email).toBe(newEmail)
}, 15000)