import { IRequest, IResponse } from "@/lib";
import {
  CommonAPIResponseType,
  CommonPromiseAPIResponseType
} from "@/lib/type";
import { HandlerParamsType } from "@/utils";
import { _findDashboardCount, _health } from "../service";

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
