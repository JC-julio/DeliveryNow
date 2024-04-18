import DeliveryManRepositoryInterface from "../../repository/DeliveryManRepositoryInterface";
import DeliveryMan from "../../../domain/DeliveryMan";
import CPFValidator from "../../../domain/validators/CPFValidator";
import EMAILValidator from "../../../domain/validators/EMAILValidator";
import * as bcrypt from 'bcrypt';


export default class CreateDeliveryMan {
    constructor(readonly repo: DeliveryManRepositoryInterface) {}
    async execute(props: Input): Promise<Output> {
        (new CPFValidator(props.CPF));
        (new EMAILValidator(props.email));
        if (await this.repo.GetbyCPF(props.CPF))
            throw new Error("CPF já cadastrado, entre em contato com o suporte para mais informações");
        if (await this.repo.GetByEmail(props.email))
            throw new Error("Email já cadastrado");
        const password = await this.hashPassword(props.password);
        const repoDeliveryMan = await this.repo.save({
            ...props,
            password: password,
            URLPhotoProfile: null,
            credibility: 100,
        });
        const deliveryMan = new DeliveryMan(
            repoDeliveryMan.name, repoDeliveryMan.CPF, repoDeliveryMan.email,
            repoDeliveryMan.vehicle, repoDeliveryMan.vehicleColor,
            repoDeliveryMan.plate, repoDeliveryMan.id, repoDeliveryMan.credibility,
            repoDeliveryMan.URLPhotoProfile);
        return deliveryMan;
    }

    async hashPassword(password: string) {
        return await bcrypt.hash(password, 6);
    }
}

export type Input = {
    name: string,
    CPF: string,
    email: string,
    vehicle: string,
    vehicleColor: string,
    plate: string,
    password: string,
}

export type Output = {
    name: string,
    CPF: string,
    email: string,
    vehicle: string,
    vehicleColor: string,
    plate: string,
    id: string,
    URLPhotoProfile?: string,
    credibility?: number,
}