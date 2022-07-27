import { UserRole } from "./user";

export type AuthResponse = {
  userId: number;
  name: string;
  email: string;
  token: string;
};

export type AuthRequest = {
  role: UserRole;
  email: string;
  password: string;
};
