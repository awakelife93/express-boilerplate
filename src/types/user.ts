import { User } from "@/entities/User";
import { CommonRequest, Sort } from "./common";

type UserRequestSubOption = {
  emailSort: Sort;
  nameSort: Sort;
};

export type UserRequest = UserRequestSubOption & CommonRequest & User;

export type UserParams = Omit<
  User,
  "userId" | "role" | "createdDt" | "updatedDt" | "deletedDt"
>;

export type UserProfile = {
  userId: number;
  email: string;
  name: string;
};

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}
