import config from "@/config";
import {
  CommonStatusCode,
  CommonStatusMessage,
  IRequest,
  onFailureHandler,
  Redis,
} from "@/lib";
import { generateRefreshTokenKey } from "@/utils";
import * as jwt from "jsonwebtoken";
import * as _ from "lodash";

export type PayloadItemType = {
  userId: number;
  email: string;
};

export type CreateTokenParamsType = {
  jwtExpired?: string | number;
} & PayloadItemType;

export type PayloadTokenType = {
  exp: number;
} & PayloadItemType;

/**
 * @description
 * @param {CreateTokenParamsType}
 * @returns {string} token
 */
export const createToken = ({
  userId,
  email,
  jwtExpired,
}: CreateTokenParamsType): string => {
  return jwt.sign(
    {
      userId,
      email,
    },
    config.jwtSecret,
    { expiresIn: jwtExpired ?? config.jwtExpired }
  );
};

export const payloadToken = (token: string): PayloadTokenType => {
  let payload = {} as PayloadTokenType;

  if (!_.isEmpty(token)) {
    payload = {
      ...(jwt.verify(token, config.jwtSecret, {
        ignoreExpiration: true,
      }) as PayloadTokenType),
    };
  }

  return payload;
};

export const checkToken = async (request: IRequest): Promise<void> => {
  const token = request.token;

  if (!_.isUndefined(token)) {
    /**
     * 로그인 상태
     */
    try {
      const now = new Date().getTime() / 1000;
      const jwtPayload: PayloadTokenType = payloadToken(token);

      // 토큰이 유효하지 않다.
      if (now > jwtPayload.exp) {
        const refreshToken = (await Redis.get(
          generateRefreshTokenKey(jwtPayload.email)
        )) as string;

        if (_.isEmpty(refreshToken)) {
          console.log(
            `===========> 1. refreshToken is Empty ${token}, refreshToken=${refreshToken}`
          );
          onFailureHandler({
            status: CommonStatusCode.UNAUTHORIZED,
            message: CommonStatusMessage.UNAUTHORIZED,
          });
        }

        const refreshTokenPayload: PayloadTokenType =
          payloadToken(refreshToken);
        if (now > refreshTokenPayload.exp) {
          console.log(`===========> 2. ${now} > refreshToken exp ${token}`);

          // 유효하지 않은 refresh token 삭제
          await Redis.remove(
            generateRefreshTokenKey(refreshTokenPayload.email)
          );

          onFailureHandler({
            status: CommonStatusCode.UNAUTHORIZED,
            message: CommonStatusMessage.UNAUTHORIZED,
          });
        } else {
          // 토큰 연장
          request.newToken = createToken({
            userId: refreshTokenPayload.userId,
            email: refreshTokenPayload.email,
            jwtExpired: config.jwtExpired,
          });
        }
      }
    } catch (error: unknown) {
      console.log(`===========> 3. ETC Error ${error} ${token}`);
      onFailureHandler({
        status: CommonStatusCode.UNAUTHORIZED,
        message: CommonStatusMessage.UNAUTHORIZED,
      });
    }
  }
};

export const getPayload = (token: string): PayloadItemType => {
  const payload: PayloadTokenType = payloadToken(token);

  if (_.isEmpty(payload)) {
    onFailureHandler({
      status: CommonStatusCode.FORBIDDEN,
      message: CommonStatusMessage.FORBIDDEN,
    });
  }

  return {
    userId: payload.userId,
    email: payload.email,
  };
};
