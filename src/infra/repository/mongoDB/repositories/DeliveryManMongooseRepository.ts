import { Injectable } from "@nestjs/common";
import DeliveryManRepositoryInterface, {Output} from "../../../../application/repository/DeliveryManRepositoryInterface";
import DeliveryMan from "../../../../domain/DeliveryMan";
import deliveryManModel from "../models/MongooseModelDeliveryMan";

@Injectable()
export default class DeliveryManMongooseRepository implements DeliveryManRepositoryInterface {
    model = deliveryManModel
    async save(deliveryMan: DeliveryMan): Promise<any> {
        return await this.model.create({
            name: deliveryMan.name,
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
}