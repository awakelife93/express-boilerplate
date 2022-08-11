import { NodeEnvironment, RedisConfig } from "@/lib";
import "dotenv/config";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

type MySQLCustomConfig = Pick<
  MysqlConnectionOptions,
  "port" | "host" | "username" | "database" | "password" | "type"
>;

export type Config = {
  NODE_ENV: NodeEnvironment;
  sentryDSN?: string;
  port: string | number;
  redis: RedisConfig;
  mysql: MySQLCustomConfig;
  jwtSecret: string;
  jwtExpireMS: number;
  jwtRefreshExpireMS: number;
  origin: string;
};

// * Because variables are injected even in the Docker environment, || is used because it is an empty string rather than undefined.
const config: Config = {
  NODE_ENV: (process.env.NODE_ENV as NodeEnvironment) || "localhost",
  sentryDSN: process.env.sentryDSN,
  port: process.env.port || 3000,
  redis: {
    host: process.env.redisHost || "127.0.0.1",
    port: process.env.redisPort ? Number(process.env.redisPort) : 6379,
  },
  mysql: {
    type: "mysql",
    port: process.env.mysqlPort ? Number(process.env.mysqlPort) : 3306,
    host: process.env.mysqlHost || "127.0.0.1",
    username: process.env.mysqlUserName,
    database: process.env.mysqlDataBase,
    password: process.env.mysqlPassword,
  },
  jwtSecret: process.env.jwtSecret || "secret",
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
};

export default config;
