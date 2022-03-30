export type NodeEnvType = "production" | "development" | "localhost";

export type UnknownObject<T = unknown> = Record<string, T>;

export type CommonAPIResponseType<T> = T | undefined;

export type CommonPromiseAPIResponseType<T> = Promise<T | undefined>;

export type ConfigType = {
  NODE_ENV: NodeEnvType;
  sentryDSN: string;
  port: string | number;
  redisPort: string | number;
  redisHost: string;
  mysqlPort: string | number;
  mysqlHost: string;
  mysqlDataBase: string;
  mysqlPassword: string;
  jwtSecret: string;
  jwtExpired: string | number;
  jwtRefreshExpired: string | number;
  origin: string;
};
