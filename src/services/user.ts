import { User } from "@/entities/User";
import {
  CommonPromiseAPIResponse,
  CommonStatusCode,
  CommonStatusMessage,
  getPayload,
  PayLoadItem,
} from "@/lib";
import AppRepository from "@/repository";
import { Query } from "@/types/common";
import { UserProfile, UserRequest } from "@/types/user";
import { onFailureHandler } from "@/utils";
import _ from "lodash";
import { Like } from "typeorm";
import { signOut } from "./auth";

export const findUserCount = async (
  conditions: Partial<UserRequest>
): CommonPromiseAPIResponse<number> => {
  let query = {} as Partial<Query>;

  if (!_.isUndefined(conditions.searchKeyword)) {
    query = {
      where: [
        {
          email: Like(`%${conditions.searchKeyword}%`),
        },
        {
          name: Like(`%${conditions.searchKeyword}%`),
        },
      ],
    };
  }

  return await AppRepository.User.count({ ...query });
};

export const findOneUser = async (
  conditions: Partial<UserRequest>
): CommonPromiseAPIResponse<User> => {
  return await AppRepository.User.findOne({ ...conditions });
};

export const findUser = async (
  conditions: Partial<UserRequest>
): CommonPromiseAPIResponse<[User[], number]> => {
  let query = {} as Query;

  if (!_.isUndefined(conditions.searchKeyword)) {
    query.where = [
      {
        email: Like(`%${conditions.searchKeyword}%`),
      },
      {
        name: Like(`%${conditions.searchKeyword}%`),
      },
    ];
  }

  if (!_.isUndefined(conditions.emailSort)) {
    query.order.email = conditions.emailSort;
  }

  if (!_.isUndefined(conditions.nameSort)) {
    query.order.name = conditions.nameSort;
  }

  return await AppRepository.User.findAndCount({
    ...conditions,
    ...query,
  });
};

export const createUser = async (
  conditions: User
): CommonPromiseAPIResponse<User> => {
  let user = (await findOneUser({
    email: conditions.email,
  })) as User;

  // 동일한 계정 정보가 있다면
  if (!_.isUndefined(user)) {
    onFailureHandler({
      status: CommonStatusCode.CONFLICT,
      message: CommonStatusMessage.CONFLICT,
    });
  }

  user = await AppRepository.User.create(conditions);
  return await AppRepository.User.save(user);
};

export const updateUser = async (
  conditions: Partial<User>
): CommonPromiseAPIResponse<User> => {
  await AppRepository.User.update({ userId: conditions.userId }, conditions);
  return findOneUser({ userId: conditions.userId });
};

export const removeUser = async (
  conditions: Partial<User>
): CommonPromiseAPIResponse<object> => {
  await AppRepository.User.softDelete({ userId: conditions.userId });
  return {};
};

export const tokenRemoveUser = async (
  token: string
): CommonPromiseAPIResponse<object> => {
  const payload: PayLoadItem = getPayload(token);
  await removeUser({ userId: payload.userId });
  return await signOut(token);
};

export const findUserProfile = async (
  token: string
): CommonPromiseAPIResponse<UserProfile> => {
  const payload: PayLoadItem = getPayload(token);
  const user = (await findOneUser({ email: payload.email })) as User;

  return {
    userId: user.userId,
    email: user.email,
    name: user.name,
  };
};
