import { IRequest, IResponse } from "@/lib";
import {
  CommonAPIResponseType,
  CommonPromiseAPIResponseType,
} from "@/lib/type";
import { _findDashboardCount, _health } from "@/services/common";
import { HandlerParamsType } from "@/utils";

export const health = (
  request: IRequest,
  response: IResponse
): CommonAPIResponseType<HandlerParamsType> => {
  return _health();
};

export const findDashboardCount = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<object> => {
  return await _findDashboardCount();
};
