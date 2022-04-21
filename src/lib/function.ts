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

export const getErrorItem = (error: unknown): HandlerParamsType => {
  const item = {
    status: CommonStatusCode.INTERNAL_SERVER_ERROR
  } as HandlerParamsType;

  if (typeof error === "string") {
    item.message = error;
  } else if (error instanceof Error) {
    item.message = error.message;
  } else {
    const _error = error as HandlerParamsType;

    item.status = _error.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR;
    item.message = _error.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR;
    item.data = _error.data;
  }

  return item;
};
