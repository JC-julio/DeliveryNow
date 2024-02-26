import LoginAndLogoutRepositoryInterface from "../../repository/LoginAndLogoutRepositoryInterface";
import jwt from 'jsonwebtoken'

export default class Logout {
  constructor(readonly repo: LoginAndLogoutRepositoryInterface) {}
  async execute(props: Input): Promise<void> {
    if(this.validToken(props.token))
        this.repo.save(props.token)
  }
  async validToken(token) {
    if(jwt.verify(token, process.env.secretJWTkey))
    return true;
  }
}
export type Input = {
    token: string,
}