import {
  AppRepository,
  CommonStatusCode,
  CommonStatusMessage,
  onFailureHandler,
} from "@/lib";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import * as _ from "lodash";
import { Like } from "typeorm";
import { QueryType } from "../../Common/type";
import { Contents } from "../entity";
import { ContentsRequestType } from "../type";

export const findContentsCount = async (
  conditions: Partial<ContentsRequestType>
): CommonPromiseAPIResponseType<number> => {
  let query = {
    where: [{ isDeleted: false }],
  } as Partial<QueryType>;

  if (!_.isUndefined(conditions.searchKeyword)) {
    query = {
      where: [
        {
          title: Like(`%${conditions.searchKeyword}%`),
          isDeleted: false,
        },
        {
          subTitle: Like(`%${conditions.searchKeyword}%`),
          isDeleted: false,
        },
      ],
    };
  }

  return await AppRepository.Contents.count({ ...query });
};

export const findOneContents = async (
  conditions: Partial<ContentsRequestType>
): CommonPromiseAPIResponseType<Contents> => {
  return await AppRepository.Contents.findOne({
    ...conditions,
    isDeleted: false,
  });
};

export const findContents = async (
  conditions: Partial<ContentsRequestType>
): CommonPromiseAPIResponseType<[Contents[], number]> => {
  let query = {
    where: [{ isDeleted: false }],
    order: {},
  } as QueryType;

  if (!_.isUndefined(conditions.searchKeyword)) {
    query.where = [
      {
        title: Like(`%${conditions.searchKeyword}%`),
        isDeleted: false,
      },
      {
        subTitle: Like(`%${conditions.searchKeyword}%`),
        isDeleted: false,
      },
    ];
  }

  if (!_.isUndefined(conditions.titleSort)) {
    query.order.title = conditions.titleSort;
  }

  if (!_.isUndefined(conditions.subTitleSort)) {
    query.order.subTitle = conditions.subTitleSort;
  }

  return await AppRepository.Contents.findAndCount({
    ...conditions,
    ...query,
  });
};

export const createContents = async (
  conditions: Contents
): CommonPromiseAPIResponseType<Contents> => {
  const contents: Contents = await AppRepository.Contents.create(conditions);
  return AppRepository.Contents.save(contents);
};

export const updateContents = async (
  conditions: Partial<Contents>
): CommonPromiseAPIResponseType<Contents> => {
  if (_.isUndefined(conditions.contentId)) {
    onFailureHandler({
      status: CommonStatusCode.BAD_REQUEST,
      message: CommonStatusMessage.BAD_REQUEST,
    });
  }

  await AppRepository.Contents.update(
    { contentId: conditions.contentId },
    conditions
  );
  return await findOneContents({ contentId: conditions.contentId });
};

export const removeContents = async (
  conditions: Partial<Contents>
): CommonPromiseAPIResponseType<object> => {
  await updateContents({ contentId: conditions.contentId, isDeleted: true });
  return {};
};
