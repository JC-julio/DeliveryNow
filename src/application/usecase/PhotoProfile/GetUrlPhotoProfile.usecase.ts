import PhotoProfileRepositoryInterface from "../../repository/PhotoProfileRepositoryInterface";

export default class GetURLPhotoProfile {
    constructor(readonly repo: PhotoProfileRepositoryInterface) {}
    async execute(props: Input): Promise<Output> {
        const user = await this.repo.GetUrlPhotoProfile(props.id)
        if(!user || user.URLPhotoProfile === null)
            throw new Error("usuário não encontrado")
        return {
            ...user,
            URLPhotoProfile: user.URLPhotoProfile
        }
    }
}

export type Input = {
    id: string,
}

export type Output = {
    URLPhotoProfile: string,
}