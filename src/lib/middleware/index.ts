import config from "@/config";
import { getErrorItem } from "@/utils";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import path from "path";
import { RouteItem } from "../routes/items";
import { createToken, getPayload, validateToken } from "./jwt";
import generateRequest from "./request";
import generateResponse from "./response";
import Sentry from "./sentry";
import { validateEntity } from "./validateEntity";

type ClientRequestItem = {
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

interface IRequest extends Request, Partial<ClientRequestItem> {}

interface IResponse extends Response {}

const initializeRouteLevelMiddleWare = async (
  request: IRequest,
  response: IResponse,
  next: NextFunction,
  routeItem: RouteItem
): Promise<void> => {
  try {
    if (config.NODE_ENV === "localhost") {
      await initializeLocalHostRouteLevelMiddleWare(
        request,
        response,
        routeItem
      );
    } else {
      await initializeProductionRouteLevelMiddleWare(
        request,
        response,
        routeItem
      );
    }

    next();
  } catch (error: unknown) {
    const _error = getErrorItem(error);

    response.status(_error.status);
    response.send(_error);
  }
};

const initializeLocalHostRouteLevelMiddleWare = async (
  request: IRequest,
  response: IResponse,
  routeItem: RouteItem
): Promise<void> => {
  await generateRequest(request);
  await generateResponse(response);
  await validateEntity(request, routeItem);
};

const initializeProductionRouteLevelMiddleWare = async (
  request: IRequest,
  response: IResponse,
  routeItem: RouteItem
): Promise<void> => {
  await generateRequest(request);
  await generateResponse(response);
  await validateToken(request);
  await validateEntity(request, routeItem);
};

const initializeMiddleWare = (
  app: express.Application
): express.Application => {
  if (config.NODE_ENV === "localhost") {
    return initializeLocalHostMiddleWare(app);
  }

  return initializeProductionMiddleWare(app);
};

const initializeLocalHostMiddleWare = (
  app: express.Application
): express.Application => {
  return setupDefaultMiddleWare(app);
};

const initializeProductionMiddleWare = (
  app: express.Application
): express.Application => {
  app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);
  app.use(Sentry.Handlers.tracingHandler());
  app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler);

  return setupDefaultMiddleWare(app);
};

const setupDefaultMiddleWare = (app: express.Application) => {
  app.use(helmet());
  app.use(
    cors({
      origin: config.origin,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));

  return app;
};

export {
  IRequest,
  IResponse,
  initializeMiddleWare,
  initializeRouteLevelMiddleWare,
  createToken,
  getPayload,
};
