import Consumer from "../../../domain/Consumer";
import ConsumerRepositoryInterface from "../../../application/repository/ConsumerRepositoryInterface";

export default class GetOneConsumer {
    constructor(
        readonly repo: ConsumerRepositoryInterface
    ) { }
    async execute(props: Input): Promise<Consumer> {
        const consumer = await this.repo.GetOne(props.id)
        return new Consumer(consumer.name, consumer.email, consumer.id)
    }
}

export type Input = {
    id: string
}