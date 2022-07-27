import { Contents } from "@/entities/Contents";
import { CommonRequest, Sort } from "./common";

type ContentsRequestSubOption = {
  titleSort: Sort;
  subTitleSort: Sort;
};

export type ContentsRequest = ContentsRequestSubOption &
  CommonRequest &
  Contents;

export type ContentParams = Omit<
  Contents,
  "contentId" | "createdDt" | "updatedDt" | "deletedDt"
>;
