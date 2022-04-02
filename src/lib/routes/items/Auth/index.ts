import { RouteItemType } from "@/lib/routes/items";
import * as Auth from "@/models/Auth/controller";

const rootPath = "/auth";
const AuthRoute: RouteItemType[] = [
  {
    path: `${rootPath}/signIn`,
    method: "post",
    next: Auth.signIn,
  },
  {
    path: `${rootPath}/signOut`,
    method: "post",
    next: Auth.signOut,
  },
];

export default AuthRoute;
