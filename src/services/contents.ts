import { Contents } from "@/entities/Contents";
import { CommonPromiseAPIResponse } from "@/lib";
import AppRepository from "@/repository";
import { Query } from "@/types/common";
import { ContentsRequest } from "@/types/contents";
import _ from "lodash";
import { Like } from "typeorm";

export const findContentsCount = async (
  conditions: Partial<ContentsRequest>
): CommonPromiseAPIResponse<number> => {
  let query = {} as Partial<Query>;

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
  conditions: Partial<ContentsRequest>
): CommonPromiseAPIResponse<Contents> => {
  return await AppRepository.Contents.findOne({ ...conditions });
};

export const findContents = async (
  conditions: Partial<ContentsRequest>
): CommonPromiseAPIResponse<[Contents[], number]> => {
  let query = {} as Query;

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
): CommonPromiseAPIResponse<Contents> => {
  const contents: Contents = await AppRepository.Contents.create(conditions);
  return AppRepository.Contents.save(contents);
};

export const updateContents = async (
  conditions: Partial<Contents>
): CommonPromiseAPIResponse<Contents> => {
  await AppRepository.Contents.update(
    { contentId: conditions.contentId },
    conditions
  );
  return await findOneContents({ contentId: conditions.contentId });
};

export const removeContents = async (
  conditions: Partial<Contents>
): CommonPromiseAPIResponse<object> => {
  await AppRepository.Contents.softDelete({ contentId: conditions.contentId });
  return {};
};
