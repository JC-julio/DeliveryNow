import {model, Schema} from 'mongoose';

export const deliveryManSchema = new Schema({
    name: String,
    password: String,
    CPF: String,
    email: String,
    vehicle: String,
    vehicleColor: String,
    plate: String,
    URLPhotoProfile: String,
    credibility: Number,
})

const deliveryManModel = model('DeliveryMan', deliveryManSchema)

export default deliveryManModel