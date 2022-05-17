import config from "@/config";
import {
  CommonStatusCode,
  CommonStatusMessage,
  createToken,
  getPayload,
  Redis,
} from "@/lib";
import { PayLoadItemType } from "@/lib/middleware/jwt";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import { User } from "@/models/User/entity";
import { findOneUser } from "@/models/User/service";
import {
  compareSync,
  findPassword,
  generateRefreshTokenKey,
  onFailureHandler,
} from "@/utils";
import * as _ from "lodash";
import { AuthRequestType, AuthResponseType } from "../type";

export const _signIn = async (
  conditions: AuthRequestType
): CommonPromiseAPIResponseType<AuthResponseType> => {
  const user = (await findOneUser({
    email: conditions.email,
  })) as User;

  // DB 데이터 유효성 검사
  if (_.isUndefined(user)) {
    onFailureHandler({
      status: CommonStatusCode.NOT_FOUND,
      message: CommonStatusMessage.NOT_FOUND,
    });
  }

  // 권한 검사
  if (conditions.role !== user.role) {
    onFailureHandler({
      status: CommonStatusCode.FORBIDDEN,
      message: CommonStatusMessage.FORBIDDEN,
    });
  }

  // 패스워드 검사
  const password = await findPassword(user.userId);
  if (!compareSync(conditions.password, password)) {
    onFailureHandler({
      status: CommonStatusCode.UNAUTHORIZED,
      message: CommonStatusMessage.UNAUTHORIZED,
    });
  }

  const refreshToken = createToken({
    userId: user.userId,
    email: user.email,
    jwtExpireMS: config.jwtRefreshExpireMS,
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
  const payload: PayLoadItemType = getPayload(token);
  Redis.remove(generateRefreshTokenKey(payload.email));
  return {};
};
