import CNPJValidator from "../../CNPJValidator"


test("Deve testar um CNPJ válido", async() => {
    const validInput = '12.345.678/0001-95'
    const cnpj = new CNPJValidator(validInput)
    expect(cnpj.value).toBe(validInput)
}, 15000)

test("Deve invalidar um CNPJ falso", async() => {
    const validInput = '12.345.678/0001-00'
	expect(() => new CNPJValidator(validInput)).toThrow(new Error("CNPJ inválido"));
},15000)