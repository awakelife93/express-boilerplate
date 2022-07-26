import { Contents } from "@/entities/Contents";
import { IRequest, IResponse } from "@/lib";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import {
  createContents,
  findContents,
  findContentsCount,
  findOneContents,
  removeContents,
  updateContents,
} from "@/services/contents";
import { ContentsRequestType } from "@/types/contents";

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
