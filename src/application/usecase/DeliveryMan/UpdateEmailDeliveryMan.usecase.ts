import DeliveryManRepositoryInterface from "../../repository/DeliveryManRepositoryInterface";

export default class UpdateEmailDeliveryMan {
    constructor(readonly repo: DeliveryManRepositoryInterface) {}
    async execute(props: Input): Promise<void> {
        await this.repo.UpdateEmail(props.id, props.email)
    }
}

export type Input = {
    id: string,
    email: string,
}