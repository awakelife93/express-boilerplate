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

/**
 * @description
 * 대표 CRUD를 통해 중복되는 객체 호출을 방지한다.
 */

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<number>}
 */
export const findCount = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<number> => {
  const conditions = request.item as ContentsRequestType;
  return await findContentsCount(conditions);
};

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<Contents>}
 */
export const findOne = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<Contents> => {
  const conditions = request.item as ContentsRequestType;
  return await findOneContents(conditions);
};

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<[Contents[], number]>}
 */
export const find = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<[Contents[], number]> => {
  const conditions = request.item as ContentsRequestType;
  return await findContents(conditions);
};

/**
 * @method POST
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<Contents>}
 */
export const create = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<Contents> => {
  const conditions = request.item as Contents;
  return await createContents(conditions);
};

/**
 * @method PATCH
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<Contents>}
 */
export const update = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<Contents> => {
  const conditions = request.item as Contents;
  return await updateContents(conditions);
};

/**
 * @method DELETE
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<object>}
 */
export const remove = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<object> => {
  const conditions = request.item as Contents;
  return await removeContents(conditions);
};
