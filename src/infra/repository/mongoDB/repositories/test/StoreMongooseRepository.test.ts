import mongoose from 'mongoose';
import StoreMongooseRepository from '../StoreMongooseRepository';
import Store from '../../../../../domain/Store';
import { config } from 'dotenv';
config();

async function postStore() {
    const store = {
        name: 'Comércio do seu zé',
        password: '12345678',
        street: 'rua das rosas',
        number: '421',
        neighborhood: 'centro',
        CEP: '12311-111',
        description: 'comercio de bebidads',
        cnpj: '12.345.678/0001-95',
        localization: 'não sei',
        email: 'seuze@gmail.com',
    }
    const storeSave = Store.create(store.name, store.password, store.street, store.number, store.neighborhood, store.CEP, store.description, store.cnpj, store.localization, store.email)
    const repo = new StoreMongooseRepository()
    const post = await repo.save(storeSave)
    return post
}

test("Deve testar o post da entidade de Comércido dentro da API", async() => {
    await mongoose.connect(process.env.connectionString);
    const store = {
        name: 'Comércio do seu zé',
        password: '12345678',
        street: 'rua das rosas',
        number: '421',
        neighborhood: 'centro',
        CEP: '12311-111',
        description: 'comercio de bebidads',
        cnpj: '12.345.678/0001-95',
        localization: 'não sei',
        email: 'seuze@gmail.com',
    }
    const storeSave = Store.create(store.name, store.password, store.street, store.number, store.neighborhood, store.CEP, store.description, store.cnpj, store.localization, store.email)
    const repo = new StoreMongooseRepository()
    const post = await repo.save(storeSave)
    expect(post).toBeDefined()
}, 15000)

test("deve testar o GetOne da entidade de comércio", async() => {
    await mongoose.connect(process.env.connectionString);
    const store = await postStore()
    const repo = new StoreMongooseRepository()
    const getStore = await repo.GetOne(store.id)
    console.log(getStore)
    expect(getStore.name).toBe(getStore.name)
},15000)

test("deve testar o getAll da entidade de comércio", async() => {
    await mongoose.connect(process.env.connectionString);
    const store = await postStore()
    const store1 = await postStore()
    const repo = new StoreMongooseRepository()
    const getStore = await repo.GetAll()
    const getStore1 = getStore.find((element) => (element.id) === store.id)
    expect(getStore1.id).toBe(store.id)
    const getStore2 = getStore.find((element) => (element.id) === store1.id)
    expect(getStore2.id).toBe(store1.id)
}, 15000)

t
