import config from "@/config";
import {
  CommonStatusCode,
  CommonStatusMessage,
  createToken,
  getPayload,
  onFailureHandler,
  Redis,
} from "@/lib";
import { PayloadItemType } from "@/lib/middleware/jwt";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import { User } from "@/models/User/entity";
import { findOneUser } from "@/models/User/service";
import { compareHash, generateRefreshTokenKey, isAdmin, isUser } from "@/utils";
import * as _ from "lodash";
import { AuthRequestType, AuthResponseType } from "../type";

export const _signInUser = async (
  conditions: AuthRequestType
): CommonPromiseAPIResponseType<AuthResponseType> => {
  const user = (await findOneUser({
    email: conditions.email,
    isDeleted: false,
  })) as User;

  // DB 데이터 유효성 검사
  if (_.isUndefined(user)) {
    onFailureHandler({
      status: CommonStatusCode.NOT_FOUND,
      message: CommonStatusMessage.NOT_FOUND,
    });
  }

  // 권한 검사
  if (!isUser(user.role)) {
    onFailureHandler({
      status: CommonStatusCode.FORBIDDEN,
      message: CommonStatusMessage.FORBIDDEN,
    });
  }

  // 패스워드 검사
  const password = await new User().findPassword(user.userId);
  if (!compareHash(conditions.password, password)) {
    onFailureHandler({
      status: CommonStatusCode.UNAUTHORIZED,
      message: CommonStatusMessage.UNAUTHORIZED,
    });
  }

  const refreshToken = createToken({
    userId: user.userId,
    email: user.email,
    jwtExpired: "3h",
  });

  // refreshToken 레디스 추가
  Redis.set(generateRefreshTokenKey(user.email), refreshToken);

  return {
    userId: user.userId,
    email: user.email,
    name: user.name,
    token: createToken({
      userId: user.userId,
      email: user.email,
    }),
  };
};

export const _signInAdmin = async (
  conditions: AuthRequestType
): CommonPromiseAPIResponseType<AuthResponseType> => {
  const user = (await findOneUser({
    email: conditions.email,
    isDeleted: false,
  })) as User;

  // DB 데이터 유효성 검사
  if (_.isEmpty(user)) {
    onFailureHandler({
      status: CommonStatusCode.NOT_FOUND,
      message: CommonStatusMessage.NOT_FOUND,
    });
  }

  // 권한 검사
  if (!isAdmin(user.role)) {
    onFailureHandler({
      status: CommonStatusCode.FORBIDDEN,
      message: CommonStatusMessage.FORBIDDEN,
    });
  }

  // 패스워드 검사
  const password = await new User().findPassword(user.userId);
  if (!compareHash(conditions.password, password)) {
    onFailureHandler({
      status: CommonStatusCode.UNAUTHORIZED,
      message: CommonStatusMessage.UNAUTHORIZED,
    });
  }

  const refreshToken = createToken({
    userId: user.userId,
    email: user.email,
    jwtExpired: config.jwtRefreshExpired,
  });

  // refreshToken 레디스 추가
  Redis.set(generateRefreshTokenKey(user.email), refreshToken);

  return {
    userId: user.userId,
    email: user.email,
    name: user.name,
    token: createToken({
      userId: user.userId,
      email: user.email,
    }),
  };
};

export const _signOut = async (
  token: string
): CommonPromiseAPIResponseType<object> => {
  const payload: PayloadItemType = await getPayload(token);

  if (_.isEmpty(payload.email)) {
    onFailureHandler({
      status: CommonStatusCode.NOT_FOUND,
      message: CommonStatusMessage.NOT_FOUND,
    });
  }

  Redis.remove(generateRefreshTokenKey(payload.email));

  return {};
};
