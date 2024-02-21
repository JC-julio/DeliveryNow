import { Injectable } from "@nestjs/common";
import StoreRepositoryInterface, {Output} from "../../../../application/repository/StoreRepositoryInterface";
import Store from "../../../../domain/Store";
import storeModel from "../models/mongooseModelStore";

@Injectable()
export default class StoreMongooseRepository implements StoreRepositoryInterface {
    model = storeModel
    async save(store: Store): Promise<any> {
        return await this.model.create({
            name: store.name,
            password: store.password,
            street: store.street,
            number: store.number,
            neighborhood: store.neighborhood,
            CEP: store.CEP,
            description: store.description,
            cnpj: store.cnpj,
            localization: store.localization,
            email: store.email,
        })
    }
    async GetOne(email: string): Promise<any> {
        
    }

    async GetAll(): Promise<Array<Output>> {
        return
    }

    async delete(email: string): Promise<void> {
        
    }
}
