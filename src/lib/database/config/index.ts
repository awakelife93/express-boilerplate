import config from "@/config";
import { ClientOpts } from "redis";
import { ConnectionOptions } from "typeorm";

export type TypeOrmConfigType = {
  [key: string]: ConnectionOptions;
};

export type RedisConfigType = {
  [key: string]: ClientOpts;
};

export const mysqlConfig: TypeOrmConfigType = {
  localhost: {
    name: "localhost",
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: config.mysqlPassword,
    database: config.mysqlDataBase,
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/models/**/*.ts"],
  },
  development: {
    name: "development",
    type: "mysql",
    host: "",
    port: undefined,
    username: "",
    password: "",
    database: "",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/models/**/*.ts"],
  },
  production: {
    name: "production",
    type: "mysql",
    host: "",
    port: undefined,
    username: "",
    password: "",
    database: "",
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
  localhost: {
    host: "127.0.0.1",
    port: 6379,
  },
  development: {
    host: "",
    port: 6379,
  },
  production: {
    host: "",
    port: 6379,
  },
};
