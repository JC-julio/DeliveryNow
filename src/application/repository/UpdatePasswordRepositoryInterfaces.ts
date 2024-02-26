export default interface UpdatePasswordRepositoryInterfaces{
    GetByEmail(email: string): Promise<any>
    updatePassword(id: string, password: string): Promise<void>
}