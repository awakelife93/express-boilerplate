import {
  CommonStatusCode,
  initializeRouteLevelMiddleWare,
  IRequest,
  IResponse
} from "@/lib";
import { getErrorItem } from "@/utils";
import { Application, NextFunction } from "express";
import _ from "lodash";
import RouteItems, { RouteItem } from "./items";

const createRoute = (app: Application): void => {
  RouteItems.forEach((item: RouteItem) => {
    app[item.method](
      item.path,
      (request: IRequest, response: IResponse, next: NextFunction) =>
        initializeRouteLevelMiddleWare(request, response, next, item),
      async (request: IRequest, response: IResponse) => {
        try {
          const result = await item.next(request, response);
          console.log(`SUCCESS_${_.toUpper(item.method)}_${item.path}`);

          let status = result.status ?? CommonStatusCode.OK;
          let data = { ...result };
          
          if (!_.isUndefined(request.newToken)) {
            status = CommonStatusCode.CREATE;
            data.token = request.token;
          }

          response.status(status);
          response.send({ item: data });
        } catch (error: unknown) {
          const _error = getErrorItem(error);
          
          console.log(`ERROR_${_.toUpper(item.method)}_${item.path}`);
          console.log(_error);
          response.status(_error.status);
          response.send(_error);
        }
      }
    );
  });
};

export default createRoute;
