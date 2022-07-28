import config from "@/config";
import { CommonStatusCode, CommonStatusMessage, IRequest, Redis } from "@/lib";
import { generateRefreshTokenKey } from "@/utils";
import jwt from "jsonwebtoken";
import _ from "lodash";

export type PayLoadItem = {
  userId: number;
  email: string;
};

export type CreateTokenParams = {
  jwtExpireMS?: number;
} & PayLoadItem;

export type TokenPayLoad = jwt.JwtPayload & Partial<PayLoadItem>;

export const createToken = ({
  userId,
  email,
  jwtExpireMS,
}: CreateTokenParams): string => {
  return jwt.sign(
    {
      userId,
      email,
    },
    config.jwtSecret,
    { expiresIn: jwtExpireMS ?? config.jwtExpireMS }
  );
};

export const getTokenPayload = (token: string): TokenPayLoad => {
  return {
    ...(jwt.verify(token, config.jwtSecret, {
      ignoreExpiration: true,
    }) as TokenPayLoad),
  };
};

export const validateToken = async (request: IRequest): Promise<void> => {
  const token = request.token;

  if (!_.isUndefined(token)) {
    /**
     * 로그인 상태
     */
    try {
      const now = new Date().getTime() / 1000;
      const jwtPayload: TokenPayLoad = getTokenPayload(token);

      if (_.isUndefined(jwtPayload.exp)) {
        console.log(`===========> token exp is undefined ${token}`);
        throw {
          status: CommonStatusCode.UNAUTHORIZED,
          message: CommonStatusMessage.UNAUTHORIZED,
        };
      }

      if (_.isUndefined(jwtPayload.email)) {
        console.log(
          `===========> jwt token payload email is undefined ${token}`
        );
        throw {
          status: CommonStatusCode.INTERNAL_SERVER_ERROR,
          message: CommonStatusMessage.INTERNAL_SERVER_ERROR,
        };
      }

      // token expired
      if (now > jwtPayload.exp) {
        const refreshToken = await Redis.get(
          generateRefreshTokenKey(jwtPayload.email)
        );

        if (_.isNull(refreshToken)) {
          console.log(`===========> 1. refreshToken is null ${token}`);
          throw {
            status: CommonStatusCode.UNAUTHORIZED,
            message: CommonStatusMessage.UNAUTHORIZED,
          };
        }

        const refreshTokenPayload: TokenPayLoad = getTokenPayload(refreshToken);

        if (_.isUndefined(refreshTokenPayload.exp)) {
          console.log(`===========> refresh token exp is undefined`);
          throw {
            status: CommonStatusCode.UNAUTHORIZED,
            message: CommonStatusMessage.UNAUTHORIZED,
          };
        }

        if (
          _.isUndefined(refreshTokenPayload.userId) ||
          _.isUndefined(refreshTokenPayload.email)
        ) {
          console.log(
            `===========> jwt refresh token payload item is undefined ${refreshToken}`
          );
          throw {
            status: CommonStatusCode.INTERNAL_SERVER_ERROR,
            message: CommonStatusMessage.INTERNAL_SERVER_ERROR,
          };
        }

        // refresh token expired
        if (now > refreshTokenPayload.exp) {
          console.log(
            `===========> 2. now: ${now} > refreshToken exp ${token}`
          );

          // 유효하지 않은 refresh token 삭제
          await Redis.remove(
            generateRefreshTokenKey(refreshTokenPayload.email)
          );

          throw {
            status: CommonStatusCode.UNAUTHORIZED,
            message: CommonStatusMessage.UNAUTHORIZED,
          };
        } else {
          // 토큰 연장
          request.newToken = createToken({
            userId: refreshTokenPayload.userId,
            email: refreshTokenPayload.email,
            jwtExpireMS: config.jwtExpireMS,
          });
        }
      }
    } catch (error: unknown) {
      console.log(`===========> 3. ETC Error ${error} ${token}`);
      throw {
        status: CommonStatusCode.UNAUTHORIZED,
        message: CommonStatusMessage.UNAUTHORIZED,
      };
    }
  }
};

export const getPayload = (token: string): PayLoadItem => {
  const payload: TokenPayLoad = getTokenPayload(token);

  if (_.isUndefined(payload.userId) || _.isUndefined(payload.email)) {
    console.log(`===========> token payload item is undefined ${token}`);
    throw {
      status: CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: CommonStatusMessage.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    userId: payload.userId,
    email: payload.email,
  };
};
