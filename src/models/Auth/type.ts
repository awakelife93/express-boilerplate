import { UserRole } from "../User/type";

export type AuthResponseType = {
  userId: number;
  name: string;
  email: string;
  token: string;
};

export type AuthRequestType = {
  role: UserRole;
  email: string;
  password: string;
};
