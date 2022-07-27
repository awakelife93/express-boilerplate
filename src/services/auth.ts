import config from "@/config";
import { User } from "@/entities/User";
import {
  CommonPromiseAPIResponse,
  CommonStatusCode,
  CommonStatusMessage,
  createToken,
  getPayload,
  PayLoadItem,
  Redis
} from "@/lib";
import { AuthRequest, AuthResponse } from "@/types/auth";
import {
  compareSync,
  findPassword,
  generateRefreshTokenKey,
  onFailureHandler
} from "@/utils";
import _ from "lodash";
import { findOneUser } from "./user";

export const signIn = async (
  conditions: AuthRequest
): CommonPromiseAPIResponse<AuthResponse> => {
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

export const signOut = async (
  token: string
): CommonPromiseAPIResponse<object> => {
  const payload: PayLoadItem = getPayload(token);
  Redis.remove(generateRefreshTokenKey(payload.email));
  return {};
};
