import mongoose from 'mongoose';
import StoreMongooseRepository from '../../../../infra/repository/mongoDB/repositories/StoreMongooseRepository';
import { config } from 'dotenv';
import GetbyEmailStore from '../../Store/GetbyEmailStore.usecase';
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
test("Deve selecionar um comércio pelo email", async() => {
    await mongoose.connect(process.env.connectionString);
    const store = await saveStore()
    const repo = new GetbyEmailStore(new StoreMongooseRepository())
    const getStore = await repo.execute(store.email)
    expect(getStore.email).toBe(store.email)
}, 15000)