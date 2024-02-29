import saveStore from "../../../../../application/usecase/test/Store/CreateStore.usecase.test"
import updatePasswordMongooseRepository from "../UpdatePasswordMongooseRepository"
import saveDeliveryMan from "../../../../../application/usecase/test/DeliveryMan/CreateDeliveryMan.usecase.test"


test("deve selecionar um comércio a partir de seu email", async() => {
    const store = await saveStore()
    const repo = new updatePasswordMongooseRepository()
    const getStore = await repo.GetByEmail(store.email)
    expect(getStore.id).toBeDefined()
}, 15000)

test("deve selecionar um entregador a partir de seu email", async() => {
    const deliveryMan = await saveDeliveryMan()
    const repo = new updatePasswordMongooseRepository()
    const getDeliveryMan = await repo.GetByEmail(deliveryMan.email)
    expect(getDeliveryMan.id).toBeDefined()
}, 15000)

test("deve substituir a senha de um comércio", async() => {
    const store = await saveStore()
    const repo = new updatePasswordMongooseRepository()
    await repo.updatePassword(store.id, 'estasenhanãoestaCRIPTOGRAFADA')
    const getStore = await repo.GetByEmail(store.email)
    expect(getStore.password).toBe('estasenhanãoestaCRIPTOGRAFADA')
}, 15000)

test("deve substituir a senha de um entregador", async() => {
    const deliveryMan = await saveDeliveryMan()
    const repo = new updatePasswordMongooseRepository()
    await repo.updatePassword(deliveryMan.id, 'estasenhanãoestaCRIPTOGRAFADA')
    const getDeliveryMan = await repo.GetByEmail(deliveryMan.email)
    console.log(getDeliveryMan)
    expect(getDeliveryMan.password).toBe('estasenhanãoestaCRIPTOGRAFADA')
}, 15000)