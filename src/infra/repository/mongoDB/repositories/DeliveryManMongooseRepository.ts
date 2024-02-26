import { Injectable } from "@nestjs/common";
import DeliveryManRepositoryInterface from "../../../../application/repository/DeliveryManRepositoryInterface";
import DeliveryMan from "../../../../domain/DeliveryMan";
import deliveryManModel from "../models/MongooseModelDeliveryMan";

@Injectable()
export default class DeliveryManMongooseRepository implements DeliveryManRepositoryInterface {
    model = deliveryManModel
    async save(deliveryMan: DeliveryMan): Promise<any> {
        return await this.model.create({
            name: deliveryMan.name,
            password: deliveryMan.password,
            CPF: deliveryMan.CPF,
            email: deliveryMan.email,
            vehicle: deliveryMan.vehicle,
            vehicleColor: deliveryMan.vehicleColor,
            plate: deliveryMan.plate,
        });
    }
    async GetOne(id: string): Promise<Output> {
        return await this.model.findById(id)
        
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
    async GetByEmail(email: string): Promise<any> {
        return await this.model.findOne({email: email})
        
    }
    async delete(id: string): Promise<void> {
        return await this.model.findByIdAndDelete(id)
    }
    async GetbyCPF(cpf: string): Promise<any> {
        return await this.model.findOne({CPF: cpf})
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
    id: string,
    name: string,
    CPF: string,
    email: string,
    vehicle: string,
    vehicleColor: string,
    plate: string,
}