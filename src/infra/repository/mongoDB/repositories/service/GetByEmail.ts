import { Injectable } from "@nestjs/common";
import ServiceRepositoryinterface from "../../../../../application/repository/Service/ServiceRepositoryInterface";
import deliveryManModel from "../../models/MongooseModelDeliveryMan";
import storeModel from "../../models/mongooseModelStore";
import consumerModel from "../../models/MongooseModelConsumer";
@Injectable()
export default class ServiceRepository implements ServiceRepositoryinterface {
    async GetByEmail(email: string): Promise<any> {
        const deliveryMan = await deliveryManModel.findOne({ email: email })
        if (deliveryMan)
            return {
                name: deliveryMan.name,
                id: deliveryMan.id,
                CPF: deliveryMan.CPF,
                email: deliveryMan.email,
                vehicle: deliveryMan.vehicle,
                vehicleColor: deliveryMan.vehicleColor,
                plate: deliveryMan.plate,
                credibility: deliveryMan.credibility,
                URLPhotoProfile: deliveryMan.URLPhotoProfile,
            }
        const store = await storeModel.findOne({ email: email })
        if (store)
            return {
                name: store.name,
                id: store.id,
                street: store.street,
                number: store.number,
                neighborhood: store.neighborhood,
                CEP: store.CEP,
                description: store.description,
                cnpj: store.cnpj,
                localization: store.localization,
                email: store.email,
                URLPhotoProfile: store.URLPhotoProfile,
            }
        const consumer = await consumerModel.findOne({ email: email })
        if (consumer) {
            return {
                name: consumer.name,
                email: consumer.email,
                id: consumer.id,
            }
        } else {
            throw new Error("Usuário não encontrado")
        }
    }
}