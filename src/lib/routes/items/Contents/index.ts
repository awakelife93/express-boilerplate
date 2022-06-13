import {
  create,
  find,
  findCount,
  findOne,
  remove,
  update,
} from "@/controllers/contents";
import { RouteItemType } from "@/lib/routes/items";
import { Contents } from "@/models/Contents";

const rootPath = "/contents";
const ContentsRoute: RouteItemType[] = [
  {
    path: `${rootPath}/count`,
    method: "get",
    next: findCount,
  },
  {
    path: rootPath,
    method: "get",
    next: find,
  },
  {
    path: `${rootPath}/:contentId`,
    method: "get",
    next: findOne,
  },
  {
    path: rootPath,
    method: "post",
    next: create,
    isValidate: true,
    entity: Contents,
  },
  {
    path: `${rootPath}/:contentId`,
    method: "patch",
    next: update,
  },
  {
    path: `${rootPath}/:contentId`,
    method: "delete",
    next: remove,
  },
];

export default ContentsRoute;
