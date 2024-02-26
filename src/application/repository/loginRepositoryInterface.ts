
export default interface LoginRepositoryInterface{
    GetByEmail(email: string): Promise<any>
}

