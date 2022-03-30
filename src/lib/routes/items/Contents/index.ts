import { RouteItemType } from "@/lib/routes/items";
import {
  create,
  find,
  findCount,
  remove,
  update,
} from "@/models/Contents/controller";
import { Contents } from "@/models/Contents/entity";

const ContentsRoute: RouteItemType[] = [
  {
    path: "/findContentsCount",
    method: "get",
    next: findCount,
  },
  {
    path: "/findContents",
    method: "get",
    next: find,
  },
  {
    path: "/createContents",
    method: "post",
    next: create,
    isValidate: true,
    entity: Contents,
  },
  {
    path: "/updateContents",
    method: "patch",
    next: update,
  },
  {
    path: "/removeContents",
    method: "delete",
    next: remove,
  },
];

export default ContentsRoute;
