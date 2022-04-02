import { RouteItemType } from "@/lib/routes/items";
import {
  create,
  find,
  findCount,
  findOne,
  findProfile,
  remove,
  tokenRemove,
  update,
} from "@/models/User/controller";
import { User } from "@/models/User/entity";

const rootPath = "/users";
const UserRoute: RouteItemType[] = [
  {
    path: `${rootPath}/count`,
    method: "get",
    next: findCount,
  },
  {
    path: `${rootPath}`,
    method: "get",
    next: find,
  },
  {
    path: `${rootPath}/:userId`,
    method: "get",
    next: findOne,
  },
  {
    path: `${rootPath}/profile`,
    method: "get",
    next: findProfile,
  },
  {
    path: `${rootPath}`,
    method: "post",
    next: create,
    isValidate: true,
    entity: User,
  },
  {
    path: `${rootPath}/:userId`,
    method: "patch",
    next: update,
  },
  {
    path: `${rootPath}/:userId`,
    method: "delete",
    next: remove,
  },
  {
    path: `${rootPath}/tokenRemove`,
    method: "delete",
    next: tokenRemove,
  },
];

export default UserRoute;
