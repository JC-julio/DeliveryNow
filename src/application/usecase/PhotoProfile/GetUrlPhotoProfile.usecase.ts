import Store from "src/domain/Store";
import PhotoProfileRepositoryInterface from "../../repository/PhotoProfileRepositoryInterface";
import DeliveryMan from "src/domain/DeliveryMan";

export default class PhotoProfile {
    constructor(readonly repo: PhotoProfileRepositoryInterface) {}
    async execute(props: Input): Promise<Output> {
        if(!await this.repo.GetOne(props.id))
            throw new Error("usuário não encontrado")
        const user = await this.repo.GetUrlPhotoProfile(props.id)
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