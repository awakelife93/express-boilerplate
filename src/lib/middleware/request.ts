import { IRequest, UnknownObject } from "@/lib";
import { ClassConstructor, plainToClass } from "class-transformer";
import { validateOrReject } from "class-validator";
import * as _ from "lodash";
import { onFailureHandler } from "../function";
import { RouteItemType } from "../routes/items";
import { CommonStatusCode, CommonStatusMessage } from "../status";

export default async (request: IRequest): Promise<void> => {
  await createToken(request);
  await createItem(request);
};

const createToken = (request: IRequest): void => {
  if (!_.isUndefined(request.headers.authorization)) {
    const token = request.headers.authorization.replace("Bearer ", "");
    request.token = token ?? "";
  }
};

const createItem = async (request: IRequest): Promise<void> => {
  switch (request.method) {
    case "GET":
    case "DELETE":
      const query: UnknownObject = { ...request.query, ...request.params };
      request.item = query;
      break;
    case "POST":
    case "PUT":
    case "PATCH":
      const body: UnknownObject = { ...request.body, ...request.params };
      request.item = body;
      break;
  }
};

export const validateBody = async (
  request: IRequest,
  routeItem: RouteItemType
): Promise<void> => {
  if (routeItem.isValidate && !_.isUndefined(routeItem.entity)) {
    await validateBodyItem(routeItem.entity, request.body);
  }
};

const validateBodyItem = async (
  entity: ClassConstructor<object>,
  item: UnknownObject
): Promise<void> => {
  const target: object = plainToClass(entity, item);
  try {
    await validateOrReject(target);
  } catch (error: unknown) {
    console.log(`validateBodyItem Error ${error}`);
    onFailureHandler({
      status: CommonStatusCode.BAD_REQUEST,
      message: CommonStatusMessage.BAD_REQUEST,
    });
  }
};
