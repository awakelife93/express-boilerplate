import { CommonPromiseAPIResponse, IRequest, IResponse } from "@/lib";
import { signIn as _signIn, signOut as _signOut } from "@/services/auth";
import { AuthRequest, AuthResponse } from "@/types/auth";

export const signIn = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<AuthResponse> => {
  const conditions = request.item as AuthRequest;
  return await _signIn(conditions);
};

export const signOut = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<object> => {
  const conditions: string = request.token ?? "";
  return await _signOut(conditions);
};
