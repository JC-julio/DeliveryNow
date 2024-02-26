import {model, Schema} from 'mongoose';

export const tokenSchema = new Schema({
    token: String,
})

const tokenModel = model('blackList', tokenSchema)
export default tokenModel