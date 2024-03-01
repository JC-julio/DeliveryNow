import {model, Schema} from 'mongoose';

export const storeSchema = new Schema({
    name: String,
    password: String,
    street: String,
    number: String,
    neighborhood: String,
    CEP: String,
    description: String,
    cnpj: String,
    localization: String,
    email: String,
    URLPhotoProfile: String,
})

const storeModel = model('store', storeSchema)

export default storeModel