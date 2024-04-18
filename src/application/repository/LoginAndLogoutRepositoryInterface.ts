export default interface LoginAndLogoutRepositoryInterface{
    save(token: string): Promise<any>
}