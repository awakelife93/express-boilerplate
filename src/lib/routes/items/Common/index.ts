import { findDashboardCount, health } from "@/controllers/common";
import { RouteItem } from "..";

const CommonRoute: RouteItem[] = [
  {
    path: "/clientHealth",
    method: "get",
    next: health,
  },
  {
    path: "/dashboardCount",
    method: "get",
    next: findDashboardCount,
  },
];

export default CommonRoute;
