export default class EMAILValidator {
    constructor(readonly email:string) {}
    static validaEMAIL(email: string): boolean {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }
}

