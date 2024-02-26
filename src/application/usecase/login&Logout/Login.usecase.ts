import LoginAndLogoutRepositoryInterface from "../../repository/LoginAndLogoutRepositoryInterface";
import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt';

export default class LoginUsecase {
  constructor(readonly repo: LoginAndLogoutRepositoryInterface) {}
  async execute(props: input): Promise<any> {
    const getUser = await this.repo.GetByEmail(props.email);
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

    async validPassword(password, passwordforDB) {
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