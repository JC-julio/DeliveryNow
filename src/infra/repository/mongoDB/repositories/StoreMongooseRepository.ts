import { Injectable } from "@nestjs/common";
import StoreRepositoryInterface from "../../../../application/repository/StoreRepositoryInterface";
import Store from "../../../../domain/Store";
import storeModel from "../models/mongooseModelStore";

@Injectable()
export default class StoreMongooseRepository implements StoreRepositoryInterface {
    model = storeModel
    async save(store: Store): Promise<any> {
        const postStore = await this.model.create({
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
        const post = {
            ...postStore['_doc'],
            id: postStore.id,
            _id: undefined
        }
        return post
    }
    async GetOne(id: string): Promise<Store> {
        const getOneStore = await this.model.findById(id)
        if(!getOneStore)
            throw new Error("nenhum usuário encontrado")
        const ObjectReturn = {
            name: getOneStore.name,
            id: getOneStore.id,
            street: getOneStore.street,
            number: getOneStore.number,
            neighborhood: getOneStore.neighborhood,
            CEP: getOneStore.CEP,
            description: getOneStore.description,
            cnpj: getOneStore.cnpj,
            localization: getOneStore.localization,
            email: getOneStore.email,
        }
        return ObjectReturn
    }

    async GetAll(): Promise<Array<Store>> {
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
        const getStore = await this.model.findOne({email: email})
        if(!getStore){
            return "nenhum usuário encontrado"
        }
        const post = {
            name: getStore.name,
            id: getStore.id,
            street: getStore.street,
            number: getStore.number,
            neighborhood: getStore.neighborhood,
            CEP: getStore.CEP,
            description: getStore.description,
            cnpj: getStore.cnpj,
            localization: getStore.localization,
            email: getStore.email,
        }
        return post
    }
}