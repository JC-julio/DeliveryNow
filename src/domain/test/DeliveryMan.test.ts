export type deliveryManDto = {
    name: string;
    CPF: string;
    email: string;
    vehicle: string;
    vehicleColor: string;
    plate: string;
}

test("Deve criar um entregador com sucesso", async() => {
    const validInput = {
        name: 'Júlio César Aguiar',
        CPF: '415.921.340-50',
        email: 'jcaguiarpg@gmail.com',
        vehicle: ''
    }
}, 15000)