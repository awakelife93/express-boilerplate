import { IRequest, IResponse } from "@/lib";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import { Contents } from "../entity";
import {
  createContents,
  findContents,
  findContentsCount,
  findOneContents,
  removeContents,
  updateContents,
} from "../service";
import { ContentsRequestType } from "../type";

export const findCount = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<number> => {
  const conditions = request.item as ContentsRequestType;
  return await findContentsCount(conditions);
};

export const findOne = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<Contents> => {
  const conditions = request.item as ContentsRequestType;
  return await findOneContents(conditions);
};

export const find = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<[Contents[], number]> => {
  const conditions = request.item as ContentsRequestType;
  return await findContents(conditions);
};

export const create = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<Contents> => {
  const conditions = request.item as Contents;
  return await createContents(conditions);
};

export const update = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<Contents> => {
  const conditions = request.item as Contents;
  return await updateContents(conditions);
};

export const remove = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<object> => {
  const conditions = request.item as Contents;
  return await removeContents(conditions);
};
