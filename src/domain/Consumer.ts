export default class Consumer {
    constructor(
        readonly name: string,
        readonly email: string,
        readonly id: string,
        readonly password?: string,
    ) {}
}