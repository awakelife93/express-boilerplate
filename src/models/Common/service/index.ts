import { CommonStatusCode, onFailureHandler } from "@/lib";
import { HandlerParamsType } from "@/lib/function";
import {
  CommonAPIResponseType,
  CommonPromiseAPIResponseType,
} from "@/lib/type";
import { findContentsCount } from "@/models/Contents/service";
import { User } from "@/models/User/entity";
import { findUser } from "@/models/User/service";
import { healthCheckMemory, isAdmin, isUser, nowMemoryPercent } from "@/utils";
import * as _ from "lodash";

export const _health = (): CommonAPIResponseType<HandlerParamsType> => {
  if (healthCheckMemory()) {
    onFailureHandler({
      status: CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: `현재 메모리 점유율이 90% 이상입니다. - ${new Date().toISOString()}`,
    });
  }

  return {
    status: CommonStatusCode.OK,
    message: `현재 메모리는 ${nowMemoryPercent()}% 입니다. - ${new Date().toISOString()}`,
  };
};

export const _findDashboardCount =
  async (): CommonPromiseAPIResponseType<object> => {
    const _users = await findUser({});
    const users = _.isUndefined(_users) ? [] : _users[0];

    const client = users.filter((user: User) => isUser(user.role));

    const admin = users.filter((user: User) => isAdmin(user.role));

    const contents = await findContentsCount({});

    return {
      usersCount: {
        total: users.length,
        client: client.length,
        admin: admin.length,
      },
      contentsCount: {
        total: contents,
      },
    };
  };
