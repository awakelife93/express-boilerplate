import { findDashboardCount, health } from "@/controllers/common";
import { RouteItemType } from "@/lib/routes/items";

const CommonRoute: RouteItemType[] = [
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
