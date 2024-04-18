import Consumer from "../../../domain/Consumer";
import ConsumerRepositoryInterface from "../../../application/repository/ConsumerRepositoryInterface";

export default class GetAllConsumer {
    constructor(readonly repo: ConsumerRepositoryInterface) { }
    async execute(): Promise<Array<Consumer>> {
        const consumers = (await this.repo.GetAll()).map((consumer) => {
            return {
                name: consumer.name,
                email: consumer.email,
                id: consumer.id,
            }
        })
        return consumers
    }
}