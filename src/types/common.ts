import { FindOperator } from "typeorm";

export type CommonRequest = {
  searchKeyword: string;
};

export type Sort = "ASC" | "DESC";

export type Query = {
  where: {
    // search
    [index: string]: FindOperator<string> | string | boolean;
  }[];
  order: {
    [index: string]: Sort;
  };
};
