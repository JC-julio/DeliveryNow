import DeliveryMan from "src/domain/DeliveryMan"
import Store from "src/domain/Store"

export default interface PhotoProfileRepositoryInterface {
    NewPhotoProfile(id: string, photo:any): Promise<void>
    GetOne(id: string): Promise<Store | DeliveryMan>
    GetUrlPhotoProfile(id): Promise<any>
}