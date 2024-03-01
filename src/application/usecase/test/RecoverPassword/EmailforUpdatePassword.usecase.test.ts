import EmailforUpdatePassword from "../../RecoverPassword/EmailforUpdatePassword.usecase"


//não foi possivel concluir este teste por completo pois não é possivel verificar
// se o email chegou, salvo nas ocasiões em que uma tela está aberta ao lado

test("deve enviar um email de verificação", async() => {
    const usecase = new EmailforUpdatePassword()
    await usecase.execute({email: 'Fornaciari049@gmail.com', code: '12345678'})
}, 15000)