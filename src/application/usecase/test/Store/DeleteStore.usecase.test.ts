import mongoose from 'mongoose';
import StoreMongooseRepository from '../../../../infra/repository/mongoDB/repositories/StoreMongooseRepository';
import saveStore from './CreateStore.usecase.test';
import { config } from 'dotenv';
import DeleteStore from '../../Store/DeleteStore.usecase';
import GetOneStore from '../../Store/GetOneStore.usecase';
config();

test("Deve deletar uma loja com sucesso", async() => {
    const store = await saveStore()
    await mongoose.connect(process.env.connectionString);
    const repo = new DeleteStore(new StoreMongooseRepository)
    const repoGetOne = new GetOneStore(new StoreMongooseRepository);
    await repo.execute(store.id)
    expect(async() => repoGetOne.execute(store.id)).rejects.toThrow(new Error("nenhum usuário encontrado"))
}, 15000)
