import { IRequest, IResponse } from "@/lib";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import { User } from "../entity";
import {
  createUser,
  findOneUser,
  findUser,
  findUserCount,
  findUserProfile,
  removeUser,
  tokenRemoveUser,
  updateUser,
} from "../service";
import { UserProfileType, UserRequestType } from "../type";

/**
 * @description
 * 대표 CRUD를 통해 중복되는 객체 호출을 방지한다.
 */

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<User>}
 */
export const findOne = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<User> => {
  const conditions = request.item as UserRequestType;
  return await findOneUser(conditions);
};

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<[User[], number]>}
 */
export const find = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<[User[], number]> => {
  const conditions = request.item as UserRequestType;
  return await findUser(conditions);
};

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<number>}
 */
export const findCount = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<number> => {
  const conditions = request.item as UserRequestType;
  return await findUserCount(conditions);
};

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<UserProfileType>}
 */
export const findProfile = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<UserProfileType> => {
  const token = request.token ?? "";
  return await findUserProfile(token);
};

/**
 * @method POST
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<User>}
 */
export const create = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<User> => {
  const conditions = request.item as User;
  return await createUser(conditions);
};

/**
 * @method PATCH
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<User>}
 */
export const update = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<User> => {
  const conditions = request.item as User;
  return await updateUser(conditions);
};

/**
 * @method DELETE
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<object>}
 */
export const remove = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<object> => {
  const conditions = request.item as User;
  return await removeUser(conditions);
};

/**
 * @method DELETE
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<object>}
 */
export const tokenRemove = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<object> => {
  const token: string = request.token ?? "";
  return await tokenRemoveUser(token);
};
