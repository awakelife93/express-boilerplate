import { RouteItemType } from "@/lib/routes/items";
import * as Auth from "@/models/Auth/controller";

const AuthRoute: RouteItemType[] = [
  {
    path: "/signInUser",
    method: "post",
    next: Auth.signInUser,
  },
  {
    path: "/signInAdmin",
    method: "post",
    next: Auth.signInAdmin,
  },
  {
    path: "/signOut",
    method: "post",
    next: Auth.signOut,
  },
];

export default AuthRoute;
