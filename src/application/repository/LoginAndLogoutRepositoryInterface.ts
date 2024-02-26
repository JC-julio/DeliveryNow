export default interface LoginAndLogoutRepositoryInterface{
    GetByEmail(email: string): Promise<any>
    save(token: string): Promise<any>
}