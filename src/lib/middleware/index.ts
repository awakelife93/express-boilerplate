import config from "@/config";
import { NextFunction, Request, Response } from "express";
import { getErrorItems } from "..";
import { RouteItemType } from "../routes/items";
import {
  checkToken,
  createToken,
  getPayload,
  getTokenPayload,
  TokenPayLoadType,
} from "./jwt";
import generateRequest, { validateBody } from "./request";
import generateResponse from "./response";

type ClientRequestItemType = {
  /**
   * Header의 토큰을 꺼내기 쉽게 정제한다.
   */
  newToken: string;
  token: string;
  /**
   * Method Type에 상관없이 쉽게 꺼내쓰기 위해 정제한다.
   */
  item: unknown;
};

interface IRequest extends Request, Partial<ClientRequestItemType> {}

interface IResponse extends Response {}

const initializeMiddleWare = async (
  request: IRequest,
  response: IResponse,
  next: NextFunction,
  routeItem: RouteItemType
): Promise<void> => {
  try {
    if (config.NODE_ENV === "localhost") {
      await initializeLocalHostMiddleWare(request, response, routeItem);
    } else {
      await initializeAllMiddleWare(request, response, routeItem);
    }

    next();
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    response.status(_error.status);
    response.send(_error);
  }
};

const initializeLocalHostMiddleWare = async (
  request: IRequest,
  response: IResponse,
  routeItem: RouteItemType
): Promise<void> => {
  await generateRequest(request);
  await generateResponse(response);
  await validateBody(request, routeItem);
};

const initializeAllMiddleWare = async (
  request: IRequest,
  response: IResponse,
  routeItem: RouteItemType
): Promise<void> => {
  await generateRequest(request);
  await generateResponse(response);
  await checkToken(request);
  await validateBody(request, routeItem);
};

export {
  IRequest,
  IResponse,
  initializeMiddleWare,
  checkToken,
  getTokenPayload,
  createToken,
  getPayload,
  TokenPayLoadType,
};
