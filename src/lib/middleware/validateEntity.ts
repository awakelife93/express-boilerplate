import { ClassConstructor, plainToClass } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";
import * as _ from "lodash";
import { IRequest } from ".";
import {
  CommonStatusCode,
  CommonStatusMessage,
  onFailureHandler,
  UnknownObject,
} from "..";
import { RouteItemType } from "../routes/items";

export const validateEntity = async (
  request: IRequest,
  routeItem: RouteItemType
): Promise<void> => {
  if (routeItem.isValidate && !_.isUndefined(routeItem.entity)) {
    await validate(routeItem.entity, request.body);
  }
};

const validate = async (
  entity: ClassConstructor<object>,
  item: UnknownObject
): Promise<void> => {
  try {
    const target: object = plainToClass(entity, item);
    await validateOrReject(target);
  } catch (error: unknown) {
    const _error = error as ValidationError;

    console.log(`validate error entity model ${entity.name} ${_error}`);
    onFailureHandler({
      status: CommonStatusCode.BAD_REQUEST,
      message: _error.toString() || CommonStatusMessage.BAD_REQUEST,
    });
  }
};
