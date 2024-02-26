export default interface LogoutRepositoryInterface{
    save(token: string): Promise<any>
}

