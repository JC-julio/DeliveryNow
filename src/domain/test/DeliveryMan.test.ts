import DeliveryMan from "../DeliveryMan";

test("Deve criar um entregador com sucesso", async() => {
    const validInput = {
        name: 'Júlio César Aguiar',
        password: '12345678',
        CPF: '415.921.340-50',
        email: 'jcaguiarpg@gmail.com',
        vehicle: 'cg titan 125cc',
        vehicleColor: 'red',
        plate:'abc 1234',
    }
    expect(DeliveryMan.create(
        validInput.name, validInput.password, validInput.CPF, validInput.email,
        validInput.vehicle, validInput.vehicleColor, validInput.plate)).toBeDefined()
}, 15000)

test("Não deve criar um entregador com CPF inválido", () => {
    const validInput = {
        name: 'Júlio César Aguiar',
        password: '12345678',
        CPF: '415.921.340-00',
        email: 'jcaguiarpg@gmail.com',
        vehicle: 'cg titan 125cc',
        vehicleColor: 'red',
        plate:'abc 1234',
    }
    expect(() => {
        DeliveryMan.create(
            validInput.name, validInput.password, validInput.CPF, validInput.email,
            validInput.vehicle, validInput.vehicleColor, validInput.plate
        )
    }).toThrow("CPF inválido")
}, 15000)