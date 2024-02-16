export default class CNPJValidator {
    constructor(readonly cnpj:string) {}
    static validaCNPJ(cnpj: string): boolean {
        cnpj = cnpj.replace(/[^\d]+/g, "");
        if (cnpj.length !== 14) {
            return false;
        }
        let soma1 = 0 
        let soma2 = 0;
        for (let i = 0; i < 12; i++) {
            soma1 += Number(cnpj[i]) * (1 + (i % 2));
            soma2 += Number(cnpj[i]) * (2 - (i % 2));
        }
        const digito1 = (soma1 % 11) < 2 ? 0 : 11 - (soma1 % 11);
        const digito2 = (soma2 % 11) < 2 ? 0 : 11 - (soma2 % 11);
        return digito1 === parseInt(cnpj[12]) && digito2 === parseInt(cnpj[13]);
    }
}