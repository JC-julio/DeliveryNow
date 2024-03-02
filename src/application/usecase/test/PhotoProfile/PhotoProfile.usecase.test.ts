import mongoose from "mongoose";
import PhotoProfileMongooseRepository from "../../../../infra/repository/mongoDB/repositories/PhotoProfileMongooseRepository"
import PhotoProfile from "../../PhotoProfile/PhotoProfile.usecase"
import path from "path";
import CreateStore from "../../Store/CreateStore.usecase";
import StoreMongooseRepository from "../../../../infra/repository/mongoDB/repositories/StoreMongooseRepository";

import * as faker from 'faker'
import { cnpj } from 'cpf-cnpj-validator';
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

const imagePath = path.resolve(__dirname, './perfil.png');
test("Deve persistir uma foto de perfil de um comérico no banco de dados no cloudnary", async() => {
    await mongoose.connect(process.env.connectionString);
    const store = await saveStore()
    const repo = new PhotoProfile(new PhotoProfileMongooseRepository)
    const URLImage = await repo.execute({id: store.id, image: imagePath})
    expect(URLImage).toBeDefined()
}, 15000)