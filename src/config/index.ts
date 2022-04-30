import { ConfigType, NodeEnvType } from "@/lib/type";
import "dotenv/config";

/**
 * 외부에 노출되는 데이터들이기 때문에 주의해서 사용해야 한다.
 */
const config: ConfigType = {
  NODE_ENV: (process.env.NODE_ENV as NodeEnvType) ?? "localhost",
  sentryDSN: process.env.dsn ?? "",
  port: process.env.port ?? 3000,
  redisPort: process.env.redisPort ?? 6379,
  redisHost: process.env.redisHost ?? "127.0.0.1",
  mysqlUserName: process.env.mysqlUserName ?? "root",
  mysqlPort: process.env.mysqlPort ?? 3306,
  mysqlHost: process.env.mysqlHost ?? "127.0.0.1",
  mysqlDataBase: process.env.mysqlDataBase ?? "localDB",
  mysqlPassword: process.env.mysqlPassword ?? "",
  jwtSecret: process.env.jwtSecret ?? "secret",
  jwtExpired: process.env.jwtExpired ?? "1h",
  jwtRefreshExpired: process.env.jwtRefreshExpired ?? "3h",
  origin:
    process.env.gatewayDomain && process.env.gatewayPort
      ? `http://${process.env.gatewayDomain}:${process.env.gatewayPort}`
      : "http://localhost:8080",
  timezone: process.env.timezone ?? "ko",
};

export default config;
