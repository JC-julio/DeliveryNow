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
    async GetOne(id: string): Promise<any> {
        return this.model.findById(id)
    }

    async GetAll(): Promise<Array<Output>> {
        const stores = (await this.model.find())
        if(!stores)
            throw new Error("nenhum usuário retornado")
        return stores.map((element) =>({
            name: element.name,
            id: element.id,
            street: element.street,
            number: element.number,
            neighborhood: element.neighborhood,
            CEP: element.CEP,
            description: element.description,
            cnpj: element.cnpj,
            localization: element.localization,
            email: element.email,

        })
        );
    }

    async delete(id: string): Promise<void> {
        await this.model.findByIdAndDelete(id)
    }

    async GetbyEmail(email: string): Promise<any> {
        return await this.model.findOne({email: email})
    }
}