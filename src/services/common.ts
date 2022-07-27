import {
  CommonAPIResponse,
  CommonPromiseAPIResponse,
  CommonStatusCode,
} from "@/lib";
import { UserRole } from "@/types/user";
import {
  HandlerParams,
  healthCheckMemory,
  nowMemoryPercent,
  onFailureHandler,
} from "@/utils";
import { findContentsCount } from "./contents";
import { findUserCount } from "./user";

export const health = (): CommonAPIResponse<HandlerParams> => {
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

export const findDashboardCount =
  async (): CommonPromiseAPIResponse<object> => {
    return {
      usersCount: {
        total: await findUserCount({}),
        client: await findUserCount({ role: UserRole.USER }),
        admin: await findUserCount({ role: UserRole.ADMIN }),
      },
      contentsCount: {
        total: await findContentsCount({}),
      },
    };
  };
