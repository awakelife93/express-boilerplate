import { QueryType } from "@/types/common";
import { ContentsRequestType } from "@/types/contents";
import { AppRepository } from "@/lib";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import { Contents } from "@/models/Contents";
import * as _ from "lodash";
import { Like } from "typeorm";

export const findContentsCount = async (
  conditions: Partial<ContentsRequestType>
): CommonPromiseAPIResponseType<number> => {
  let query = {} as Partial<QueryType>;

  if (!_.isUndefined(conditions.searchKeyword)) {
    query = {
      where: [
        {
          title: Like(`%${conditions.searchKeyword}%`),
        },
        {
          subTitle: Like(`%${conditions.searchKeyword}%`),
        },
      ],
    };
  }

  return await AppRepository.Contents.count({ ...query });
};

export const findOneContents = async (
  conditions: Partial<ContentsRequestType>
): CommonPromiseAPIResponseType<Contents> => {
  return await AppRepository.Contents.findOne({ ...conditions });
};

export const findContents = async (
  conditions: Partial<ContentsRequestType>
): CommonPromiseAPIResponseType<[Contents[], number]> => {
  let query = {} as QueryType;

  if (!_.isUndefined(conditions.searchKeyword)) {
    query.where = [
      {
        title: Like(`%${conditions.searchKeyword}%`),
      },
      {
        subTitle: Like(`%${conditions.searchKeyword}%`),
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
  await AppRepository.Contents.update(
    { contentId: conditions.contentId },
    conditions
  );
  return await findOneContents({ contentId: conditions.contentId });
};

export const removeContents = async (
  conditions: Partial<Contents>
): CommonPromiseAPIResponseType<object> => {
  await AppRepository.Contents.softDelete({ contentId: conditions.contentId });
  return {};
};
