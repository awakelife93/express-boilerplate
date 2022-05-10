import { CommonRequestType, SortType } from "../Common/type";
import { Contents } from "./entity";

type ContentsRequestSubOptionType = {
  titleSort: SortType;
  subTitleSort: SortType;
};

export type ContentsRequestType = ContentsRequestSubOptionType &
  CommonRequestType &
  Contents;

export type ContentParamsType = Omit<
  Contents,
  "contentId" | "createdDt" | "updatedDt" | "deletedDt"
>;
