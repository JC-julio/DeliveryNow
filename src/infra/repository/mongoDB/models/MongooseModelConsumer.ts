import {model, Schema} from 'mongoose';

export const consumerSchema = new Schema({
    name: String,
    password: String,
    email: String,
    id: String,
})

const consumerModel = model('Consumer', consumerSchema)

export default consumerModel