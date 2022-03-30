import { RouteItemType } from "@/lib/routes/items";
import {
  create,
  find,
  findCount,
  findProfile,
  remove,
  tokenRemove,
  update,
} from "@/models/User/controller";
import { User } from "@/models/User/entity";

const UserRoute: RouteItemType[] = [
  {
    path: "/findUser",
    method: "get",
    next: find,
  },
  {
    path: "/findUserCount",
    method: "get",
    next: findCount,
  },
  {
    path: "/findUserProfile",
    method: "get",
    next: findProfile,
  },
  {
    path: "/createUser",
    method: "post",
    next: create,
    isValidate: true,
    entity: User,
  },
  {
    path: "/updateUser",
    method: "patch",
    next: update,
  },
  {
    path: "/removeUser",
    method: "delete",
    next: remove,
  },
  {
    path: "/tokenRemoveUser",
    method: "delete",
    next: tokenRemove,
  },
];

export default UserRoute;
