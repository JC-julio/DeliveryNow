export default class Consumer {
    constructor(
        readonly user: string,
        readonly email: string,
        readonly id: string,
        readonly password?: string,
    ) {}
}