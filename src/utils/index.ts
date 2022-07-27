import config, { Config } from "@/config";
import { ErrorStatusMessage } from "@/lib";
import _ from "lodash";
import os from "os";
export * from "./error";
export * from "./hash";
export * from "./user";

export const generateRefreshTokenKey = (email: string): string => {
  if (_.isEmpty(email)) {
    throw new Error(ErrorStatusMessage.GENERATE_REFRESH_TOKEN_KEY_FAIL);
  }

  return `${email}_RefreshToken`;
};

export const nowMemoryPercent = (): number => {
  const totalmem = os.totalmem();
  const freemem = os.freemem();
  const memoryPercent = (freemem / totalmem) * 100;

  return memoryPercent;
};

export const healthCheckMemory = (): boolean => {
  const memoryLimit = 90;
  return nowMemoryPercent() >= memoryLimit;
};

export const generateConfigLog = (): void => {
  console.log("==================================");
  console.log("*");
  console.log(
    `* start time: ${new Date().toLocaleDateString("ko", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })}`
  );
  Object.keys(config).forEach((key) => {
    const value = config[key as keyof Config];
    if (_.isObjectLike(value)) {
      console.log(`* ${key}: `);
      console.log(value);
    } else {
      console.log(`* ${key}: ${value}`);
    }
  });
  console.log("*");
  console.log("==================================");
};
