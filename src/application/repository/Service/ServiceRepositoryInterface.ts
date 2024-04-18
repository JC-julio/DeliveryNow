export default interface ServiceRepositoryinterface {
    GetByEmail(email: string): Promise<any>
}