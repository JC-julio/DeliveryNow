import DeliveryMan from "../../../../domain/DeliveryMan";
import PhotoProfileRepositoryInterface from "../../../../application/repository/PhotoProfileRepositoryInterface";
import deliveryManModel from "../models/MongooseModelDeliveryMan";
import storeModel from "../models/mongooseModelStore";
import Store from "../../../../domain/Store";


export default class PhotoProfileMongooseRepository implements PhotoProfileRepositoryInterface {
    modelDeliveryMan = deliveryManModel
    modelStore = storeModel
    
    async NewPhotoProfile(id: string, URLPhotoProfile: any): Promise<void> {
        if(await this.modelDeliveryMan.findById(id)) {
            await this.modelDeliveryMan.findByIdAndUpdate(id, {URLPhotoProfile: URLPhotoProfile})
        } else if(await this.modelStore.findById(id)) {
            await this.modelStore.findByIdAndUpdate(id, {URLPhotoProfile: URLPhotoProfile})
        }
    }
    async GetOne(id: string): Promise<Store | DeliveryMan> {
        const store = await this.modelStore.findById(id)
        if(store)
        return {
            name: store.name,
            password: store.password,
            id: store.id,
            street: store.street,
            number: store.number,
            neighborhood: store.neighborhood,
            CEP: store.CEP,
            description: store.description,
            cnpj: store.cnpj,
            localization: store.localization,
            email: store.email,
        }
        const deliveryMan = await this.modelDeliveryMan.findById(id)
        if(deliveryMan)
        return {
            name: deliveryMan.name,
            password: deliveryMan.password,
            id: deliveryMan.id,
            CPF: deliveryMan.CPF,
            email: deliveryMan.email,
            vehicle: deliveryMan.vehicle,
            vehicleColor: deliveryMan.vehicleColor,
            plate: deliveryMan.plate}
    }
}
