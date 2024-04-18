import ConsumerRepositoryInterface from "../../../application/repository/ConsumerRepositoryInterface";

export default class DeleteConsumer {
    constructor(
        readonly repo: ConsumerRepositoryInterface,
    ) { }
    async execute(props: Input): Promise<void> {
        await this.repo.delete(props.id)
    }
}

export type Input = {
    id: string
}