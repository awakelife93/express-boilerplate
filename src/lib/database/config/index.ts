import config from "@/config";
import { NodeEnvironment } from "@/lib";
import { ClientOpts } from "redis";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

export type MySQLConfig = {
  [env in NodeEnvironment]: MysqlConnectionOptions;
};

export type RedisConfig = ClientOpts;

export const mysqlConfig: MySQLConfig = {
  localhost: {
    ...config.mysql,
    name: "localhost",
    synchronize: true,
    logging: false,
    dropSchema: true,
    debug: true,
    entities: ["src/entities/**/*.ts"],
    extra: {
      connectionLimit: 5,
    },
  },
  development: {
    ...config.mysql,
    name: "development",
    synchronize: false,
    logging: false,
    entities: ["src/entities/**/*.ts"],
    extra: {
      connectionLimit: 10,
    },
  },
  production: {
    ...config.mysql,
    name: "production",
    synchronize: false,
    logging: true,
    entities: ["src/entities/**/*.ts"],
    migrationsTableName: "migrations",
    extra: {
      connectionLimit: 50,
    },
    cli: {
      entitiesDir: "src/entities",
      // migrationsDir: "src/migration",
      // subscribersDir: "src/subscriber",
    },
  },
};

export const redisConfig: RedisConfig = config.redis;
