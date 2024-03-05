import Store from "src/domain/Store";
import PhotoProfileRepositoryInterface from "../../repository/PhotoProfileRepositoryInterface";
import DeliveryMan from "src/domain/DeliveryMan";

export default class GetURLPhotoProfile {
    constructor(readonly repo: PhotoProfileRepositoryInterface) {}
    async execute(props: Input): Promise<Output> {
        const user = await this.repo.GetUrlPhotoProfile(props.id)
        if(!user || user.URLPhotoProfile)
            throw new Error("usuário não encontrado")
        return {
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