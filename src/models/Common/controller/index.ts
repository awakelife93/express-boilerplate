import { IRequest, IResponse } from "@/lib";
import { HandlerParamsType } from "@/lib/function";
import {
  CommonAPIResponseType,
  CommonPromiseAPIResponseType,
} from "@/lib/type";
import { _findDashboardCount, _health } from "../service";

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonAPIResponseType<HandlerParamsType>}
 */
export const health = (
  request: IRequest,
  response: IResponse
): CommonAPIResponseType<HandlerParamsType> => {
  return _health();
};

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<object>}
 */
export const findDashboardCount = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<object> => {
  return await _findDashboardCount();
};
