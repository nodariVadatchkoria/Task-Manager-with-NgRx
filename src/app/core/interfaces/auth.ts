import {User} from "./user";
import {Token} from "./token";

export interface Register {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface Login {
  email: string;
  password: string;
}



export interface LoginResponse {
  user: User;
  token: Token;
}
