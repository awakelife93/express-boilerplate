import { CommonStatusCode, CommonStatusMessage, UnknownObject } from "@/lib";

export type HandlerParamsType = {
  status: number;
  message: string;
  data?: UnknownObject;
};

export const onFailureHandler = ({
  status = CommonStatusCode.INTERNAL_SERVER_ERROR,
  message = CommonStatusMessage.INTERNAL_SERVER_ERROR,
  data = {},
}: HandlerParamsType): HandlerParamsType => {
  throw {
    status,
    message,
    data,
  };
};

export const getErrorItems = (error: unknown): HandlerParamsType => {
  const item = {} as HandlerParamsType;

  if (typeof error === "string") {
    item.status = 500;
    item.message = error;
  } else if (error instanceof Error) {
    item.status = 500;
    item.message = error.message;
  } else {
    const _error = error as HandlerParamsType;

    item.status = _error.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR;
    item.message = _error.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR;
    item.data = _error.data;
  }

  return item;
};
