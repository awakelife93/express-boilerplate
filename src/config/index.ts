import { RedisConfigType } from "@/lib/database/config";
import { NodeEnvType } from "@/lib/type";
import "dotenv/config";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

type MysqlType = Pick<
  MysqlConnectionOptions,
  "port" | "host" | "username" | "database" | "password"
>;

export type ConfigType = {
  NODE_ENV: NodeEnvType;
  sentryDSN: string;
  port: string | number;
  redis: RedisConfigType;
  mysql: {
    [env in NodeEnvType]: MysqlType;
  };
  jwtSecret: string;
  jwtExpireMS: number;
  jwtRefreshExpireMS: number;
  origin: string;
  timezone: string;
};

const config: ConfigType = {
  NODE_ENV: (process.env.NODE_ENV as NodeEnvType) ?? "localhost",
  sentryDSN: process.env.dsn ?? "",
  port: process.env.port ?? 3000,
  redis: {
    localhost: {
      host: process.env.redisLocalHost ?? "127.0.0.1",
      port: process.env.redisLocalHostPort
        ? Number(process.env.redisLocalHostPort)
        : 6379,
    },
    development: {
      host: process.env.redisDevelopmentHost ?? "",
      port: process.env.redisDevelopmentPort
        ? Number(process.env.redisDevelopmentPort)
        : 6379,
    },
    production: {
      host: process.env.redisProductionHost ?? "",
      port: process.env.redisProductionPort
        ? Number(process.env.redisProductionPort)
        : 6379,
    },
  },
  mysql: {
    localhost: {
      port: process.env.mysqlLocalhostPort
        ? Number(process.env.mysqlLocalhostPort)
        : 3306,
      host: process.env.mysqlLocalHost ?? "127.0.0.1",
      username: process.env.mysqlLocalHostUserName ?? "root",
      database: process.env.mysqlLocalHostDataBase ?? "localDB",
      password: process.env.mysqlLocalHostPassword ?? "",
    },
    development: {
      port: process.env.mysqlDevelopmentPort
        ? Number(process.env.mysqlDevelopmentPort)
        : 3306,
      host: process.env.mysqlDevelopmentHost ?? "",
      username: process.env.mysqlDevelopmentUserName ?? "",
      database: process.env.mysqlDevelopmentDataBase ?? "",
      password: process.env.mysqlDevelopmentPassword ?? "",
    },
    production: {
      port: process.env.mysqlProductionPort
        ? Number(process.env.mysqlProductionPort)
        : 3306,
      host: process.env.mysqlProductionHost ?? "",
      username: process.env.mysqlProductionUserName ?? "",
      database: process.env.mysqlProductionDataBase ?? "",
      password: process.env.mysqlProductionPassword ?? "",
    },
  },
  jwtSecret: process.env.jwtSecret ?? "secret",
  jwtExpireMS: process.env.jwtExpireMS
    ? Number(process.env.jwtExpireMS)
    : 60000 * 60, // 1h
  jwtRefreshExpireMS: process.env.jwtRefreshExpireMS
    ? Number(process.env.jwtRefreshExpireMS)
    : 60000 * 60 * 3, // 3h
  origin:
    process.env.gatewayDomain && process.env.gatewayPort
      ? `http://${process.env.gatewayDomain}:${process.env.gatewayPort}`
      : "http://localhost:8080",
  timezone: process.env.timezone ?? "ko",
};

export default config;
