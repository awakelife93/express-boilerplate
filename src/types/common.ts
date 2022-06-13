import { FindOperator } from "typeorm";

export type CommonRequestType = {
  searchKeyword: string;
};

export type SortType = "ASC" | "DESC";

export type QueryType = {
  where: {
    // search
    [index: string]: FindOperator<string> | string | boolean;
  }[];
  order: {
    [index: string]: SortType;
  };
};
