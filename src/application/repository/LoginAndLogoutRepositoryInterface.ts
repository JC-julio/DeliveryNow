export default interface LoginAndLogoutRepositoryInterface{
    save(token: string): Promise<any>
    GetByEmail(email: string): Promise<any>
}