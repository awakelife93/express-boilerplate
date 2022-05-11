import {
  AppRepository,
  CommonStatusCode,
  CommonStatusMessage,
  getPayload
} from "@/lib";
import { PayLoadItemType } from "@/lib/middleware/jwt";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import { _signOut } from "@/models/Auth/service";
import { QueryType } from "@/models/Common/type";
import { onFailureHandler } from "@/utils";
import * as _ from "lodash";
import { Like } from "typeorm";
import { User } from "../entity";
import { UserProfileType, UserRequestType } from "../type";

export const findUserCount = async (
  conditions: Partial<UserRequestType>
): CommonPromiseAPIResponseType<number> => {
  let query = {} as Partial<QueryType>;

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
  conditions: Partial<UserRequestType>
): CommonPromiseAPIResponseType<User> => {
  return await AppRepository.User.findOne({ ...conditions });
};

export const findUser = async (
  conditions: Partial<UserRequestType>
): CommonPromiseAPIResponseType<[User[], number]> => {
  let query = {
    order: {},
  } as QueryType;

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
): CommonPromiseAPIResponseType<User> => {
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
): CommonPromiseAPIResponseType<User> => {
  await AppRepository.User.update({ userId: conditions.userId }, conditions);
  return findOneUser({ userId: conditions.userId });
};

export const removeUser = async (
  conditions: Partial<User>
): CommonPromiseAPIResponseType<object> => {
  await AppRepository.User.softDelete({ userId: conditions.userId });
  return {};
};

export const tokenRemoveUser = async (
  token: string
): CommonPromiseAPIResponseType<object> => {
  const payload: PayLoadItemType = getPayload(token);
  await removeUser({ userId: payload.userId });
  return await _signOut(token);
};

export const findUserProfile = async (
  token: string
): CommonPromiseAPIResponseType<UserProfileType> => {
  const payload: PayLoadItemType = getPayload(token);
  const user = (await findOneUser({ email: payload.email })) as User;

  return {
    userId: user.userId,
    email: user.email,
    name: user.name,
  };
};
