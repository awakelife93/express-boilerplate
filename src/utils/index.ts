import config, { ConfigType } from "@/config";
import * as _ from "lodash";
import * as os from "os";
import { getErrorItem, HandlerParamsType, onFailureHandler } from "./error";
import { compareSync, hashSync } from "./hash";
import { findPassword, isAdmin, isUser } from "./user";

export const generateRefreshTokenKey = (email: string): string => {
  if (_.isEmpty(email)) {
    throw new Error("generateRefreshTokenKey Failed - Empty Email");
  }

  return `${email}_RefreshToken`;
};

export const nowMemoryPercent = (): number => {
  const totalmem = os.totalmem();
  const freemem = os.freemem();
  const memPercent = (freemem / totalmem) * 100;

  return memPercent;
};

export const healthCheckMemory = (): boolean => {
  const memoryLimit = 90;
  return nowMemoryPercent() >= memoryLimit;
};

export const generateConfigLog = (): void => {
  console.log("==================================");
  console.log("*");
  console.log(
    `* start time: ${new Date().toLocaleDateString(config.timezone, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })}`
  );
  Object.keys(config).forEach((key) => {
    const value = config[key as keyof ConfigType];
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

export {
  isAdmin,
  isUser,
  findPassword,
  compareSync,
  hashSync,
  getErrorItem,
  HandlerParamsType,
  onFailureHandler,
};
