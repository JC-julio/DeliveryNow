import EMAILValidator from "../../EMAILValidator"


test("Deve testar um email válido", async() => {
    const validInput = 'jcaguiarpg@gmail.com'
    const email = new EMAILValidator(validInput)
    expect(email.value).toBe(validInput)
}, 15000)

test("Deve invalidar um email falso", async() => {
    const validInput = 'jcaguiargmail.br'
	expect(() => new EMAILValidator(validInput)).toThrow(new Error("Email inválido"));
},15000)