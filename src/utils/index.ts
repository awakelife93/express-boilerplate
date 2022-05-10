import config from "@/config";
import { AppRepository } from "@/lib";
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

export const isUser = (role: UserRole): boolean => role === UserRole.USER;

export const isAdmin = (role: UserRole): boolean => role === UserRole.ADMIN;

export const findPassword = async (userId: number): Promise<string> => {
  const user = await AppRepository.User.createQueryBuilder("user")
    .select("user.userId", "userId")
    .addSelect("user.password")
    .where("user.userId = :userId", { userId })
    .getOne();

  return user?.password ?? "";
};

export const generateConfigLog = (): void => {
  console.log("==================================");
  console.log("*");
  console.log("*");
  console.log("*");
  console.log("*");
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
    console.log(`* ${key}: ${config[key as keyof ConfigType]}`);
  });
  console.log("*");
  console.log("*");
  console.log("*");
  console.log("*");
  console.log("*");
  console.log("==================================");
};
