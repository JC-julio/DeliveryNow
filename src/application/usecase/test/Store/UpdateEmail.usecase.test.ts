import mongoose from 'mongoose';
import StoreMongooseRepository from '../../../../infra/repository/mongoDB/repositories/StoreMongooseRepository';
import { config } from 'dotenv';
import GetOneStore from '../../Store/GetOneStore.usecase';
import UpdateEmailStore from '../../Store/UpdateEmailStore.usecase';
config();

import * as faker from 'faker'
import { cnpj } from 'cpf-cnpj-validator';
import CreateStore from '../../Store/CreateStore.usecase';
async function saveStore() {
    const validInput = {
        name: 'loja do seu zé',
        password: '12345678',
        street: 'rua 1',
        number: '401',
        neighborhood: 'bairro do seu zé',
        CEP: '72507-241',
        description: 'comércio de bebidas',
        cnpj: cnpj.generate(),
        localization: '-13.655173, -59.791912',
        email: faker.internet.email()
    }
    await mongoose.connect(process.env.connectionString);
    const repo = new CreateStore(new StoreMongooseRepository())
    const store = await repo.execute(validInput)
    return {
        ...store,
        password: validInput.password
    }
}

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