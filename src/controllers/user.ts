import { User } from "@/entities/User";
import { IRequest, IResponse } from "@/lib";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import {
  createUser,
  findOneUser,
  findUser,
  findUserCount,
  findUserProfile,
  removeUser,
  tokenRemoveUser,
  updateUser
} from "@/services/user";
import { UserProfileType, UserRequestType } from "@/types/user";

export const findOne = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<User> => {
  const conditions = request.item as UserRequestType;
  return await findOneUser(conditions);
};

export const find = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<[User[], number]> => {
  const conditions = request.item as UserRequestType;
  return await findUser(conditions);
};

export const findCount = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<number> => {
  const conditions = request.item as UserRequestType;
  return await findUserCount(conditions);
};

export const findProfile = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<UserProfileType> => {
  const token = request.token ?? "";
  return await findUserProfile(token);
};

export const create = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<User> => {
  const conditions = request.item as User;
  return await createUser(conditions);
};

export const update = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<User> => {
  const conditions = request.item as User;
  return await updateUser(conditions);
};

export const remove = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<object> => {
  const conditions = request.item as User;
  return await removeUser(conditions);
};

export const tokenRemove = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<object> => {
  const token: string = request.token ?? "";
  return await tokenRemoveUser(token);
};
