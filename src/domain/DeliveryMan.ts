export default class DeliveryMan {
    constructor(
        readonly name: string, readonly CPF: string, readonly email: string, readonly vehicle: string,
        readonly vehicleColor: string, readonly plate: string, readonly id: string, readonly credibility?: number,  readonly password?: string,
        readonly URLPhotoProfile?: string) {
    }
}