import Store from "../Store"

test("Deve criar uma loja com sucesso", async() => {
    const validInput = {
        name: 'Loja do seu zé',
        street: 'rua 1',
        number: '402',
        neighborhood: 'bairro das flores',
        CEP: '76964000',
        description:'loja de artigos antigos',
        cnpj: '31.248.889/0001-54',
        localization: "-13.660194, -59.792806",
        email: 'seuzeloja@gmail.com'
    }
    expect(Store.create(validInput.name, validInput.street, validInput.number, validInput.neighborhood, validInput.CEP, validInput.description, validInput.cnpj, validInput.localization, validInput.email)).toBeDefined()
}, 15000)

test("Não deve criar uma loja com CNPJ inválido", () => {
    const validInput = {
        name: 'Loja do seu zé',
        street: 'rua 1',
        number: '402',
        neighborhood: 'bairro das flores',
        CEP: '76964000',
        description:'loja de artigos antigos',
        cnpj: '31.248.889/0001-000',
        localization: "-13.660194, -59.792806",
        email: 'seuzeloja@gmail.com'
    }
    expect(() => {
        Store.create(validInput.name, validInput.street, validInput.number, validInput.neighborhood, validInput.CEP, validInput.description, validInput.cnpj, validInput.localization, validInput.email)
    }).toThrow("CNPJ inválido")
}, 15000)

test("Não deve criar um entregador com email inválido", () => {
    const validInput = {
        name: 'Loja do seu zé',
        street: 'rua 1',
        number: '402',
        neighborhood: 'bairro das flores',
        CEP: '76964000',
        description:'loja de artigos antigos',
        cnpj: '31.248.889/0001-54',
        localization: "-13.660194, -59.792806",
        email: 'seuzelogmail.com'
    }
    expect(() => {
        Store.create(validInput.name, validInput.street, validInput.number, validInput.neighborhood, validInput.CEP, validInput.description, validInput.cnpj, validInput.localization, validInput.email)
    }).toThrow("Email inválido")
}, 15000)