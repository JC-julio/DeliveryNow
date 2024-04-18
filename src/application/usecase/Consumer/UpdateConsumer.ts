import ConsumerRepositoryInterface from "../../../application/repository/ConsumerRepositoryInterface";

export default class UpdateConsumer {
    constructor(readonly repo: ConsumerRepositoryInterface) { }
    async execute(props: Input): Promise<void> {
        this.repo.update(props.id, props.name, props.email)
    }
}

export type Input = {
    id: string,
    name: string,
    email: string,
}