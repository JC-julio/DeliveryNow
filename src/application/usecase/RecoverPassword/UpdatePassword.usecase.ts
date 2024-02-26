import UpdatePasswordRepositoryInterfaces from "../../repository/UpdatePasswordRepositoryInterfaces";
import * as bcrypt from 'bcrypt';

export default class UpdatePassword {
    constructor(readonly repo: UpdatePasswordRepositoryInterfaces) {}
    async execute(props: Input) {
        const password = await this.hashPassword(props.password);
        await this.repo.updatePassword(props.id, password)
}
    async hashPassword(password: string) {
        return await bcrypt.hash(password, 6);
}
}

export type Input = {
    id: string,
    password: string
}