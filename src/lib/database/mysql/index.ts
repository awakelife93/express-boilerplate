import config from "@/config";
import { AppRepository } from "@/lib";
import { createConnection } from "typeorm";
import { mysqlConfig } from "../config";

export const connectMysql = async (): Promise<void> => {
  await createConnection(mysqlConfig[config.NODE_ENV]);
};

export const connectRepository = (): void => {
  AppRepository.connect();
};
