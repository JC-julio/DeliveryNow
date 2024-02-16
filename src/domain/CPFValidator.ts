export default class CPFValidator {
    constructor(readonly cpf:string) {}
    static validaCPF(cpf: string): boolean {
        cpf = cpf.replace(/[^\d]+/g, "");
        if (cpf.length !== 11) {
          return false;
        }
        let soma1 = 0
        let soma2 = 0;
        for (let i = 0; i < 9; i++) {
          soma1 += Number(cpf[i]) * (10 - i);
          soma2 += Number(cpf[i]) * (11 - i);
        }
        soma2 += Number(cpf[9]) * 2;
        let digito1 = (soma1 % 11) < 2 ? 0 : 11 - (soma1 % 11);
        let digito2 = (soma2 % 11) < 2 ? 0 : 11 - (soma2 % 11);
        return digito1 === parseInt(cpf[9]) && digito2 === parseInt(cpf[10]);
    }
}