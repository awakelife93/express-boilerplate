import { CommonRequestType, SortType } from "../Common/type";
import { User } from "./entity";

type UserRequestSubOptionType = {
  emailSort: SortType;
  nameSort: SortType;
};

export type UserRequestType = UserRequestSubOptionType &
  CommonRequestType &
  User;

export type UserParamsType = Omit<
  User,
  "userId" | "role" | "createdDt" | "updatedDt" | "deletedDt"
>;

export type UserProfileType = {
  userId: number;
  email: string;
  name: string;
};

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}
