import config from "@/config";
import { NodeEnvType } from "@/lib/type";
import { ClientOpts } from "redis";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

export type MySQLConfigType = {
  [env in NodeEnvType]: MysqlConnectionOptions;
};

export type RedisConfigType = ClientOpts;

export const mysqlConfig: MySQLConfigType = {
  localhost: {
    ...config.mysql,
    name: "localhost",
    type: "mysql",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/models/**/*.ts"],
    extra: {
      connectionLimit: 5,
    },
  },
  development: {
    ...config.mysql,
    name: "development",
    type: "mysql",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/models/**/*.ts"],
    extra: {
      connectionLimit: 10,
    },
  },
  production: {
    ...config.mysql,
    name: "production",
    type: "mysql",
    synchronize: false,
    logging: true,
    entities: ["src/models/**/*.ts"],
    migrationsTableName: "migrations",
    extra: {
      connectionLimit: 50,
    },
    cli: {
      entitiesDir: "src/entity",
      // migrationsDir: "src/migration",
      // subscribersDir: "src/subscriber",
    },
  },
};

export const redisConfig: RedisConfigType = config.redis;
