import { Contents } from "@/models/Contents";
import { CommonRequestType, SortType } from "./common";

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
