import mongoose from "mongoose";
import PhotoProfileMongooseRepository from "../../../../infra/repository/mongoDB/repositories/PhotoProfileMongooseRepository"
import PhotoProfile from "../../PhotoProfile/PhotoProfile.usecase"
import path from "path";
import CreateStore from "../../Store/CreateStore.usecase";
import StoreMongooseRepository from "../../../../infra/repository/mongoDB/repositories/StoreMongooseRepository";

import * as faker from 'faker'
import { cnpj } from 'cpf-cnpj-validator';
import GetURLPhotoProfile from "../../PhotoProfile/GetUrlPhotoProfile.usecase";
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

test("Deve pegar a foto de perfil de um comércio", async() => {
    const store = await saveStore()
    const repo = new PhotoProfile(new PhotoProfileMongooseRepository)
    await repo.execute({id: store.id, image: imagePath})
    const repoGetPhoto = new GetURLPhotoProfile(new PhotoProfileMongooseRepository())
    const getStore = await repoGetPhoto.execute({id: store.id})
    console.log(getStore.URLPhotoProfile)
    expect(getStore.URLPhotoProfile).toBeDefined()
}, 15000)