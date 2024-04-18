import EMAILValidator from "../../../domain/validators/EMAILValidator";
import ConsumerRepositoryInterface from "../../repository/ConsumerRepositoryInterface";
import * as bcrypt from 'bcrypt';
import Consumer from "../../../domain/Consumer";

export default class CreateConsumer {
    constructor (readonly repo: ConsumerRepositoryInterface) {}
    async execute(props: Input) {
        (new EMAILValidator(props.email))
        if (await this.repo.GetByEmail(props.email))
            throw new Error("CPF já cadastrado, entre em contato com o suporte para mais informações");
        const password = await this.hashPassword(props.password)
        const repoConsumer = await this.repo.save({
            ...props,
            password: password,
        })
        const consumer = new Consumer(
            repoConsumer.user, repoConsumer.email, repoConsumer.id
        );
        return consumer
    }
    async hashPassword(password: string) {
        return await bcrypt.hash(password, 6);
    }
}

export type Input = {
    user: string,
    password: string,
    email: string,
    id: string,
}