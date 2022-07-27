import { signIn, signOut } from "@/controllers/auth";
import { RouteItem } from "..";

const rootPath = "/auth";
const AuthRoute: RouteItem[] = [
  {
    path: `${rootPath}/signIn`,
    method: "post",
    next: signIn,
  },
  {
    path: `${rootPath}/signOut`,
    method: "post",
    next: signOut,
  },
];

export default AuthRoute;
