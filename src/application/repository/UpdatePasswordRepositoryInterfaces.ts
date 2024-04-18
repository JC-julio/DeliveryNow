export default interface UpdatePasswordRepositoryInterfaces{
    updatePassword(id: string, password: string): Promise<void>
}