import { User } from "@/entities/User";
import { CommonPromiseAPIResponse, IRequest, IResponse } from "@/lib";
import {
  createUser,
  findOneUser,
  findUser,
  findUserCount,
  findUserProfile,
  removeUser,
  tokenRemoveUser,
  updateUser,
} from "@/services/user";
import { UserProfile, UserRequest } from "@/types/user";

export const findOne = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<User> => {
  const conditions = request.item as UserRequest;
  return await findOneUser(conditions);
};

export const find = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<[User[], number]> => {
  const conditions = request.item as UserRequest;
  return await findUser(conditions);
};

export const findCount = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<number> => {
  const conditions = request.item as UserRequest;
  return await findUserCount(conditions);
};

export const findProfile = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<UserProfile> => {
  const token = request.token ?? "";
  return await findUserProfile(token);
};

export const create = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<User> => {
  const conditions = request.item as User;
  return await createUser(conditions);
};

export const update = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<User> => {
  const conditions = request.item as User;
  return await updateUser(conditions);
};

export const remove = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<object> => {
  const conditions = request.item as User;
  return await removeUser(conditions);
};

export const tokenRemove = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<object> => {
  const token: string = request.token ?? "";
  return await tokenRemoveUser(token);
};
