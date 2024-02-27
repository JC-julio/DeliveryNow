import mongoose from 'mongoose';
import * as faker from 'faker'
import { cpf } from 'cpf-cnpj-validator';
import DeliveryManMongooseRepository from '../DeliveryManMongooseRepository';
import DeliveryMan from '../../../../../domain/DeliveryMan';
import { config } from 'dotenv';
config();

async function postDeliveryMan() {
    await mongoose.connect(process.env.connectionString);
    const validInput = {
        name: 'Joãozinho',
        password: '12345678',
        CPF: cpf.generate(),
        email: faker.internet.email(),
        vehicle: 'cg 160',
        vehicleColor:'preta',
        plate: 'abc-1234',
    }
    const deliveryMan = new DeliveryMan(validInput.name, validInput.CPF, validInput.email, validInput.vehicle, validInput.vehicleColor, validInput.plate, validInput.password)
    const repo = new DeliveryManMongooseRepository()
    const post = await repo.save(deliveryMan)
    return post
}

test("Deve persistir um entregador na database", async() => {
    await mongoose.connect(process.env.connectionString);
    const validInput = {
        name: 'Joãozinho',
        password: '12345678',
        CPF: cpf.generate(),
        email: faker.internet.email(),
        vehicle: 'cg 160',
        vehicleColor:'preta',
        plate: 'abc-1234',
    }
    const deliveryMan = new DeliveryMan(validInput.name, validInput.CPF, validInput.email, validInput.vehicle, validInput.vehicleColor, validInput.plate, validInput.password)
    const repo = new DeliveryManMongooseRepository()
    const post = await repo.save(deliveryMan)
    console.log(post)
    expect(post).toBeDefined()
}, 15000)

test("Deve testar o GetOne do repositório de entregadores", async() => {
    await mongoose.connect(process.env.connectionString);
    const deliveryMan = await postDeliveryMan()
    const repo = new DeliveryManMongooseRepository()
    const getDeliveryMan = await repo.GetOne(deliveryMan.id)
    expect(getDeliveryMan.id).toBeDefined()
}, 15000)

test("Deve testar o Getall do repositório de entregadores", async() => {
    await mongoose.connect(process.env.connectionString);
    const deliveryMan = await postDeliveryMan();
    const deliveryMan1 = await postDeliveryMan();
    const repo = new DeliveryManMongooseRepository()
    const getDeliveryMan = await repo.GetAll()
    const getDeliveryMan1 = getDeliveryMan.find((element)=> (element.id) === deliveryMan.id)
    expect(getDeliveryMan1.id).toBe(deliveryMan.id)
    const getDeliveryMan2 = getDeliveryMan.find((element)=> (element.id) === deliveryMan1.id)
    expect(getDeliveryMan2.id).toBe(deliveryMan1.id)
}, 15000)

test("Deve testar o GetByEmail do repositório de entregadores", async() => {
    await mongoose.connect(process.env.connectionString);
    const deliveryMan = await postDeliveryMan();
    const repo = new DeliveryManMongooseRepository()
    const getDeliveryMan = await repo.GetByEmail(deliveryMan.email)
    expect(getDeliveryMan.email).toBe(deliveryMan.email)
}, 15000)

test("Deve testar o delete do repositório de entregadores", async() => {
    await mongoose.connect(process.env.connectionString);
    const deliveryMan = await postDeliveryMan();
    const repo = new DeliveryManMongooseRepository()
    await repo.delete(deliveryMan.id)
    expect(async() => await repo.GetOne(deliveryMan.id)).rejects.toThrow(new Error("nenhum usuário encontrado")) 
}, 15000)

test("Deve testar o método GetByCPF do repositório de entregadores", async () => {
    await mongoose.connect(process.env.connectionString);
    const deliveryMan = await postDeliveryMan();
    const repo = new DeliveryManMongooseRepository()
    const getDeliveryMan = await repo.GetbyCPF(deliveryMan.CPF)
    expect(getDeliveryMan.CPF).toBe(deliveryMan.CPF)
}, 15000)

test("Deve testar o método que atualiza o nome da entidade no repositório de entregadores", async() => {
    await mongoose.connect(process.env.connectionString);
    const deliveryMan = await postDeliveryMan();
    const repo = new DeliveryManMongooseRepository()
    await repo.UpdateName(deliveryMan.id, 'João Augusto dos santos')
    const getDeliveryMan = await repo.GetOne(deliveryMan.id)
    expect(getDeliveryMan.name).toBe('João Augusto dos santos')   
}, 15000)

test("Deve testar o método que atualiza o email da entidade no repositório de entregadores", async() => {
    await mongoose.connect(process.env.connectionString);
    const newEmail = faker.internet.email()
    const deliveryMan = await postDeliveryMan();
    const repo = new DeliveryManMongooseRepository()
    await repo.UpdateEmail(deliveryMan.id, newEmail)
    const getDeliveryMan = await repo.GetOne(deliveryMan.id)
    expect(getDeliveryMan.email).toBe(newEmail)
}, 15000)

test("não deve atualizar o email da entidade no repositório de entregadores se ele já existir na entidade", async() => {
    await mongoose.connect(process.env.connectionString);
    const deliveryMan = await postDeliveryMan();
    const repo = new DeliveryManMongooseRepository()
    expect(async() => await repo.UpdateEmail(deliveryMan.id, deliveryMan.email)).rejects.toThrow(new Error("email já cadastrado")) 
}, 15000)