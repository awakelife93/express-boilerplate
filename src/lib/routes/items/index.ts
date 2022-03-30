import { ClassConstructor } from "class-transformer";
import AuthRoute from "./Auth";
import CommonRoute from "./Common";
import ContentsRoute from "./Contents";
import UserRoute from "./User";

export type RouteItemType = {
  path: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  next: Function;
  isValidate?: boolean;
  entity?: ClassConstructor<object>;
};

const item: RouteItemType[] = [
  ...CommonRoute,
  ...AuthRoute,
  ...UserRoute,
  ...ContentsRoute,
];

export default item;
