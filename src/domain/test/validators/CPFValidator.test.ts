import CPFValidator from "../../validators/CPFValidator"


test("Deve testar um cpf válido", async() => {
    const validInput = '415.921.340-50'
    const cpf = new CPFValidator(validInput)
    expect(cpf.value).toBe(validInput)
}, 15000)

test("Deve invalidar um CPF falso", async() => {
    const validInput = '051.405.741.99'
	expect(() => new CPFValidator(validInput)).toThrow(new Error("Email inválido"));
},15000)