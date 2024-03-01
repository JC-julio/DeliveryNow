import jwt from 'jsonwebtoken'
import saveStore from '../../../../../application/usecase/test/Store/CreateStore.usecase.test';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import LoginAndLogoutMongooseRepository from '../LoginAndLogoutMongooseRepository';
import saveDeliveryMan from '../../../../../application/usecase/test/DeliveryMan/CreateDeliveryMan.usecase.test';
config()

test("Deve criar um novo token de logout na blackList", async() => {
    await mongoose.connect(process.env.connectionString);
    const fakeId = 'abfkjahdv1kh2'
    const token = jwt.sign({ fakeID: fakeId }, process.env.secretJWTkey, { expiresIn: '7d' });
    const repo = new LoginAndLogoutMongooseRepository()
    const saveToken = await repo.save(token)
    expect(saveToken.token).toBe(token)
}, 15000)

test("deve selecionar um comércio com base em seu email", async() => {
    await mongoose.connect(process.env.connectionString);
    const store = await saveStore()
    const repo = new LoginAndLogoutMongooseRepository()
    const getStore = await repo.GetByEmail(store.email)
    expect(getStore.email).toBe(store.email)
}, 15000)

test("deve selecionar um entregador com base em seu email", async() => {
    await mongoose.connect(process.env.connectionString);
    const deliveryMan = await saveDeliveryMan()
    const repo = new LoginAndLogoutMongooseRepository()
    const getDeliveryMan = await repo.GetByEmail(deliveryMan.email)
    expect(getDeliveryMan.email).toBe(deliveryMan.email)
}, 15000)