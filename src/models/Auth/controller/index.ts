import { IRequest, IResponse } from "@/lib";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import { _signInAdmin, _signInUser, _signOut } from "@/models/Auth/service";
import { AuthRequestType, AuthResponseType } from "../type";

/**
 * @method POST
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<AuthResponseType>}
 */
export const signInUser = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<AuthResponseType> => {
  const conditions = request.item as AuthRequestType;
  return await _signInUser(conditions);
};

/**
 * @method POST
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<AuthResponseType>}
 */
export const signInAdmin = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<AuthResponseType> => {
  const conditions = request.item as AuthRequestType;
  return await _signInAdmin(conditions);
};

/**
 * @method POST
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<object>}
 */
export const signOut = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<object> => {
  const conditions: string = request.token ?? "";
  return await _signOut(conditions);
};
