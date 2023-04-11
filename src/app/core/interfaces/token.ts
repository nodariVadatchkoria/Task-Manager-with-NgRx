import {User} from "./user";

export interface Token {
  expiresIn: number;
  accessToken: string;
  refreshToken: string;

}

export interface ILoginPayload {
  user: User;
  token: Token;
}
