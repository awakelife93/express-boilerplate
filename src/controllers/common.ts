import {
  CommonAPIResponse,
  CommonPromiseAPIResponse,
  IRequest,
  IResponse,
} from "@/lib";

import {
  findDashboardCount as _findDashboardCount,
  health as _health,
} from "@/services/common";
import { HandlerParams } from "@/utils";

export const health = (
  request: IRequest,
  response: IResponse
): CommonAPIResponse<HandlerParams> => {
  return _health();
};

export const findDashboardCount = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<object> => {
  return await _findDashboardCount();
};
