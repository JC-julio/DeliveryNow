import mongoose from "mongoose";
import PhotoProfileMongooseRepository from "../../../../infra/repository/mongoDB/repositories/PhotoProfileMongooseRepository"
import PhotoProfile from "../../PhotoProfile/PhotoProfile.usecase"
import saveStore from "../Store/CreateStore.usecase.test"
import path from "path";

const imagePath = path.resolve(__dirname, './perfil.png');


test("Deve persistir uma foto de perfil de um comérico no banco de dados no cloudnary", async() => {
    await mongoose.connect(process.env.connectionString);
    const store = await saveStore()
    const repo = new PhotoProfile(new PhotoProfileMongooseRepository)
    const URLImage = await repo.execute({id: store.id, image: imagePath})
    console.log(URLImage)
}, 15000)