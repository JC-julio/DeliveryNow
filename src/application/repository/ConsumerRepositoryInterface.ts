import Consumer from "../../domain/Consumer";

export default interface ConsumerRepositoryInterface {
    save(Consumer: Omit<Consumer, 'id'>): Promise<Consumer>
}