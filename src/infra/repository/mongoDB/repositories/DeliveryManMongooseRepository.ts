import { Injectable } from "@nestjs/common";
import DeliveryManRepositoryInterface from "../../../../application/repository/DeliveryManRepositoryInterface";
import DeliveryMan from "../../../../domain/DeliveryMan";
import deliveryManModel from "../models/MongooseModelDeliveryMan";

@Injectable()
export default class DeliveryManMongooseRepository implements DeliveryManRepositoryInterface {
    model = deliveryManModel
    async save(deliveryMan: DeliveryMan): Promise<Output> {
        const postDeliveryMan = await this.model.create({
            name: deliveryMan.name,
            CPF: deliveryMan.CPF,
            email: deliveryMan.email,
            vehicle: deliveryMan.vehicle,
            vehicleColor: deliveryMan.vehicleColor,
            plate: deliveryMan.plate,
            password: deliveryMan.password,
        });
        const post = {
            ...postDeliveryMan['_doc'],
            id: postDeliveryMan.id,
            _id: undefined,
        }
        return post
    }
    async GetOne(id: string): Promise<Output> {
        const getOneDeliveryMan = await this.model.findById(id)
        if(!getOneDeliveryMan)
            throw new Error("nenhum usuário encontrado")
        const ObjectReturn = {
            name: getOneDeliveryMan.name,
            id: getOneDeliveryMan.id,
            CPF: getOneDeliveryMan.CPF,
            email: getOneDeliveryMan.email,
            vehicle: getOneDeliveryMan.vehicle,
            vehicleColor: getOneDeliveryMan.vehicleColor,
            plate: getOneDeliveryMan.plate,
        }
        return ObjectReturn
    }
    async GetAll(): Promise<Output[]> {
        const deliveryMans = await this.model.find()
        if(!deliveryMans)
            throw new Error("nenhum usuário encontrado")
        return deliveryMans.map((element) => ({
            name: element.name,
            id: element.id,
            CPF: element.CPF,
            email: element.email,
            vehicle: element.vehicle,
            vehicleColor: element.vehicleColor,
            plate: element.plate,
        }))
    }
    async GetByEmail(email: string): Promise<Output> {
        const getDeliveryMan = await this.model.findOne({email: email})
        if(getDeliveryMan)
        return {
            name: getDeliveryMan.name,
            id: getDeliveryMan.id,
            CPF: getDeliveryMan.CPF,
            email: getDeliveryMan.email,
            vehicle: getDeliveryMan.vehicle,
            vehicleColor: getDeliveryMan.vehicleColor,
            plate: getDeliveryMan.plate}
    }
    async delete(id: string): Promise<void> {
        return await this.model.findByIdAndDelete(id)
    }
    async GetbyCPF(cpf: string): Promise<Output> {
        const getDeliveryMan = await this.model.findOne({CPF: cpf})
        if(getDeliveryMan)
        return {
            name: getDeliveryMan.name,
            id: getDeliveryMan.id,
            CPF: getDeliveryMan.CPF,
            email: getDeliveryMan.email,
            vehicle: getDeliveryMan.vehicle,
            vehicleColor: getDeliveryMan.vehicleColor,
            plate: getDeliveryMan.plate}
    }
    async UpdateName(id: string, name: string): Promise<void> {
        return await this.model.findByIdAndUpdate(id, {name: name})
    }
    async UpdateEmail(id: string, email: string): Promise<void> {
        if(await this.model.findOne({email: email}))    
            throw new Error("email já cadastrado")
        return await this.model.findByIdAndUpdate(id, {email: email})
    }
}

export type Output = {
    name: string,
    CPF: string,
    email: string,
    vehicle: string,
    vehicleColor: string,
    plate: string,
    id: string,
}