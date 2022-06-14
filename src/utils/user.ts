import AppRepository from "@/repository";
import { UserRole } from "@/types/user";

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
