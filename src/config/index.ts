import { RedisConfigType } from "@/lib/database/config";
import { NodeEnvType } from "@/lib/type";
import "dotenv/config";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

type MySQLCustomConfigType = Pick<
  MysqlConnectionOptions,
  "port" | "host" | "username" | "database" | "password" | "type"
>;

export type ConfigType = {
  NODE_ENV: NodeEnvType;
  sentryDSN?: string;
  port: string | number;
  redis: RedisConfigType;
  mysql: MySQLCustomConfigType;
  jwtSecret: string;
  jwtExpireMS: number;
  jwtRefreshExpireMS: number;
  origin: string;
};

const config: ConfigType = {
  NODE_ENV: (process.env.NODE_ENV as NodeEnvType) ?? "localhost",
  sentryDSN: process.env.sentryDSN,
  port: process.env.port ?? 3000,
  redis: {
    host: process.env.redisHost ?? "127.0.0.1",
    port: process.env.redisPort ? Number(process.env.redisPort) : 6379,
  },
  mysql: {
    type: "mysql",
    port: process.env.mysqlPort ? Number(process.env.mysqlPort) : 3306,
    host: process.env.mysqlHost ?? "127.0.0.1",
    username: process.env.mysqlUserName,
    database: process.env.mysqlDataBase,
    password: process.env.mysqlPassword,
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
};

export default config;
