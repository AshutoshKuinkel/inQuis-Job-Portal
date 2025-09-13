import { Role } from "./enum.types";

export interface ILoginData {
  email: string;
  password: string;
}

export interface ISignupData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role:Role
  createdAt:string
}
