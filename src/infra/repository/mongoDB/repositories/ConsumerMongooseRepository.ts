import { Injectable } from "@nestjs/common";
import ConsumerRepositoryInterface from "../../../../application/repository/ConsumerRepositoryInterface";
import Consumer from "src/domain/Consumer";
import consumerModel from "../models/MongooseModelConsumer";

@Injectable()
export default class ConsumerMongooseRepository implements ConsumerRepositoryInterface {
    model = consumerModel
    async save(consumer: Omit<Consumer, "id">): Promise<Consumer> {
        const consumerCreated = await this.model.create({
            name: consumer.name,
            password: consumer.password,
            email: consumer.email,
        })
    }
}