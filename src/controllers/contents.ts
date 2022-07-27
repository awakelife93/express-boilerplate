import { Contents } from "@/entities/Contents";
import { CommonPromiseAPIResponse, IRequest, IResponse } from "@/lib";
import {
  createContents,
  findContents,
  findContentsCount,
  findOneContents,
  removeContents,
  updateContents,
} from "@/services/contents";
import { ContentsRequest } from "@/types/contents";

export const findCount = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<number> => {
  const conditions = request.item as ContentsRequest;
  return await findContentsCount(conditions);
};

export const findOne = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<Contents> => {
  const conditions = request.item as ContentsRequest;
  return await findOneContents(conditions);
};

export const find = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<[Contents[], number]> => {
  const conditions = request.item as ContentsRequest;
  return await findContents(conditions);
};

export const create = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<Contents> => {
  const conditions = request.item as Contents;
  return await createContents(conditions);
};

export const update = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<Contents> => {
  const conditions = request.item as Contents;
  return await updateContents(conditions);
};

export const remove = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<object> => {
  const conditions = request.item as Contents;
  return await removeContents(conditions);
};
