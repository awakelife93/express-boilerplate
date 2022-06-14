import config from "@/config";
import { createConnection } from "typeorm";
import { mysqlConfig } from "../config";

export const connectMysql = async (): Promise<void> => {
  await createConnection(mysqlConfig[config.NODE_ENV]);
};
