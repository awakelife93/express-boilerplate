import { IRequest, IResponse } from "@/lib";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import { _signIn, _signOut } from "@/models/Auth/service";
import { AuthRequestType, AuthResponseType } from "../type";

export const signIn = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<AuthResponseType> => {
  const conditions = request.item as AuthRequestType;
  return await _signIn(conditions);
};

export const signOut = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<object> => {
  const conditions: string = request.token ?? "";
  return await _signOut(conditions);
};
