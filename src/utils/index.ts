import config from "@/config";
import { ConfigType } from "@/lib/type";
import { UserRole } from "@/models/User/type";
import * as bcrypt from "bcrypt";
import * as _ from "lodash";
import * as os from "os";

export const hashSync = (data: string, saltRounds: number = 10): string => {
  return bcrypt.hashSync(data, saltRounds);
};

export const compareHash = (oldHash: string, newHash: string): boolean => {
  return bcrypt.compareSync(oldHash, newHash);
};

export const generateRefreshTokenKey = (email: string): string => {
  if (_.isEmpty(email)) {
    throw new Error("generateRefreshTokenKey Failed - Empty Email");
  }

  return `${email}_RefreshToken`;
};

/**
 * nowMemoryPercent
 * @description
 * 해당 인스턴스 서버의 메모리 제공
 * @returns {number}
 */
export const nowMemoryPercent = (): number => {
  const totalmem = os.totalmem();
  const freemem = os.freemem();
  const memPercent = (freemem / totalmem) * 100;

  return memPercent;
};

/**
 * healthCheckMemory
 * @description
 * 해당 인스턴스 서버의 메모리 체크
 * @returns {boolean}
 */
export const healthCheckMemory = (): boolean => {
  const memoryLimit = 90;
  return nowMemoryPercent() >= memoryLimit;
};

export const isUser = (role: UserRole): boolean => role === UserRole.USER;

export const isAdmin = (role: UserRole): boolean => role === UserRole.ADMIN;

export const generateConfigLog = () => {
  return Object.keys(config).forEach((key) => {
    console.log(`${key}: ${config[key as keyof ConfigType]}`);
  })
}