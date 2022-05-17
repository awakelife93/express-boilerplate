import config from "@/config";
import { NodeEnvType } from "@/lib/type";
import { ClientOpts } from "redis";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

export type MySQLConfigType = {
  [env in NodeEnvType]: MysqlConnectionOptions;
};

export type RedisConfigType = {
  [env in NodeEnvType]: ClientOpts;
};

export const mysqlConfig: MySQLConfigType = {
  localhost: {
    ...config.mysql.localhost,
    name: "localhost",
    type: "mysql",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/models/**/*.ts"],
  },
  development: {
    ...config.mysql.development,
    name: "development",
    type: "mysql",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/models/**/*.ts"],
  },
  production: {
    ...config.mysql.production,
    name: "production",
    type: "mysql",
    synchronize: false,
    logging: true,
    entities: ["src/models/**/*.ts"],
    migrationsTableName: "migrations",
    cli: {
      entitiesDir: "src/entity",
      // migrationsDir: "src/migration",
      // subscribersDir: "src/subscriber",
    },
  },
};

export const redisConfig: RedisConfigType = {
  localhost: config.redis.localhost,
  development: config.redis.development,
  production: config.redis.production,
};
