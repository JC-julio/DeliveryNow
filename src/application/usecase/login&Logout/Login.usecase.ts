import LoginAndLogoutRepositoryInterface from "../../repository/LoginAndLogoutRepositoryInterface";
import jwt from 'jsonwebtoken'
import { config } from 'dotenv';
config()
import * as bcrypt from 'bcrypt';
import ServiceRepositoryinterface from "../../repository/Service/ServiceRepositoryInterface";

export default class LoginUsecase {
  constructor(
    readonly repo: LoginAndLogoutRepositoryInterface,
    readonly service: ServiceRepositoryinterface,
    ) {}
  async execute(props: input): Promise<any> {
    const getUser = await this.service.GetByEmail(props.email)
    if(!getUser)
        throw new Error("usuário não encontrado")
    const token = await this.generateToken(getUser.id)
    if (this.validPassword(props.password, getUser.password)) {
        const objectReturn = {
            ...getUser,
            token: token,
        };
    
        return objectReturn;
    }}

    async generateToken(storeId): Promise<string> {
        const token = await jwt.sign({storeId: storeId}, process.env.secretJWTkey, {expiresIn: '7d'});
        return token;
    }

    async validPassword(password, passwordforDB): Promise<boolean> {
        const passwordIsValid = await bcrypt.compare(password, passwordforDB)
        if(!passwordIsValid){
          throw new Error("Senha incorreta!")
          }
        return true;
    }
}

export type input = {
    email: string,
    password: string,
};

export type output = {
    token: string,
    name: string,
    id: string,
};