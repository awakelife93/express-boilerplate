import { ConfigType, NodeEnvType } from "@/lib/type";
import "dotenv/config";

/**
 * 외부에 노출되는 데이터들이기 때문에 주의해서 사용해야 한다.
 */
const config: ConfigType = {
  // "development" | "production" | "localhost"
  NODE_ENV: (process.env.NODE_ENV as NodeEnvType) ?? "localhost",
  // sentry dsn
  sentryDSN: process.env.dsn ?? "",
  // react port를 3000으로 준다.
  port: process.env.port ?? 3000,
  // redis
  redisPort: process.env.redisPort ?? 6379,
  redisHost: process.env.redisHost ?? "127.0.0.1",
  // mysql
  mysqlPort: process.env.mysqlPort ?? 3306,
  mysqlHost: process.env.mysqlHost ?? "127.0.0.1",
  mysqlDataBase: process.env.database ?? "localDB",
  mysqlPassword: process.env.mysqlPassword ?? "",
  // jwt
  jwtSecret: process.env.jwtSecret ?? "secret",
  jwtExpired: process.env.jwtExpired ?? "1h",
  jwtRefreshExpired: process.env.jwtRefreshExpired ?? "3h",
  // domain
  origin:
    process.env.gatewayDomain && process.env.gatewayPort
      ? `http://${process.env.gatewayDomain}:${process.env.gatewayPort}`
      : "http://localhost:8080",
};

export default config;
