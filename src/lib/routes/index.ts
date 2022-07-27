import {
  CommonStatusCode,
  initializeRouteLevelMiddleWare,
  IRequest,
  IResponse,
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

          /**
           * 새로 생성된 토큰이 있으면 요청에 대한 응답 + 새로운 토큰 발급
           */
          if (!_.isUndefined(request.newToken)) {
            response.status(CommonStatusCode.CREATE);
            response.send({
              token: request.newToken,
              item: result,
            });
          } else {
            response.status(result.status ?? CommonStatusCode.OK);
            response.send({
              item: result,
            });
          }
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
