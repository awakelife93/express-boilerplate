import {
  AppRepository,
  CommonStatusCode,
  CommonStatusMessage,
  getPayload,
  onFailureHandler,
} from "@/lib";
import { PayLoadItemType } from "@/lib/middleware/jwt";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import { _signOut } from "@/models/Auth/service";
import { QueryType } from "@/models/Common/type";
import * as _ from "lodash";
import { Like } from "typeorm";
import { User } from "../entity";
import { UserProfileType, UserRequestType } from "../type";

export const findUserCount = async (
  conditions: Partial<UserRequestType>
): CommonPromiseAPIResponseType<number> => {
  let query = {
    where: [{ isDeleted: false }],
  } as Partial<QueryType>;

  if (!_.isUndefined(conditions.searchKeyword)) {
    query = {
      where: [
        {
          email: Like(`%${conditions.searchKeyword}%`),
          isDeleted: false,
        },
        {
          name: Like(`%${conditions.searchKeyword}%`),
          isDeleted: false,
        },
      ],
    };
  }

  return await AppRepository.User.count({ ...query });
};

export const findOneUser = async (
  conditions: Partial<UserRequestType>
): CommonPromiseAPIResponseType<User> => {
  return await AppRepository.User.findOne({
    ...conditions,
    isDeleted: false,
  });
};

export const findUser = async (
  conditions: Partial<UserRequestType>
): CommonPromiseAPIResponseType<[User[], number]> => {
  let query = {
    where: [{ isDeleted: false }],
    order: {},
  } as QueryType;

  if (!_.isUndefined(conditions.searchKeyword)) {
    query.where = [
      {
        email: Like(`%${conditions.searchKeyword}%`),
        isDeleted: false,
      },
      {
        name: Like(`%${conditions.searchKeyword}%`),
        isDeleted: false,
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
    isDeleted: false,
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
  if (_.isUndefined(conditions.userId)) {
    onFailureHandler({
      status: CommonStatusCode.BAD_REQUEST,
      message: CommonStatusMessage.BAD_REQUEST,
    });
  }

  await AppRepository.User.update({ userId: conditions.userId }, conditions);
  return findOneUser({ userId: conditions.userId });
};

export const removeUser = async (
  conditions: Partial<User>
): CommonPromiseAPIResponseType<object> => {
  await updateUser({ userId: conditions.userId, isDeleted: true });
  return {};
};

export const tokenRemoveUser = async (
  token: string
): CommonPromiseAPIResponseType<object> => {
  const payload: PayLoadItemType = await getPayload(token);
  await removeUser({ userId: payload.userId });
  return await _signOut(token);
};

export const findUserProfile = async (
  token: string
): CommonPromiseAPIResponseType<UserProfileType> => {
  const payload: PayLoadItemType = await getPayload(token);
  const user = (await findOneUser({ email: payload.email })) as User;

  if (_.isUndefined(user)) {
    console.log(
      `findUserProfile - token missing (item = ${payload} / token = ${token} / user = ${user})`
    );
    onFailureHandler({
      status: CommonStatusCode.NOT_FOUND,
      message: CommonStatusMessage.NOT_FOUND,
    });
  }

  return {
    userId: user.userId,
    email: user.email,
    name: user.name,
  };
};
