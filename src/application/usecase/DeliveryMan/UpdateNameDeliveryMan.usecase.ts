import DeliveryManRepositoryInterface from "src/application/repository/DeliveryManRepositoryInterface";

export default class UpdateNameDeliveryMan {
    constructor(readonly repo: DeliveryManRepositoryInterface) {}
    async execute(props: Input): Promise<void> {
        await this.repo.UpdateName(props.id, props.name)
    }
}

export type Input = {
    id: string,
    name: string,
}