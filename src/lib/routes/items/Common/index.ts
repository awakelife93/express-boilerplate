import { RouteItemType } from "@/lib/routes/items";
import * as Common from "@/models/Common/controller";

const CommonRoute: RouteItemType[] = [
  {
    path: "/clientHealth",
    method: "get",
    next: Common.health,
  },
  {
    path: "/dashboardCount",
    method: "get",
    next: Common.findDashboardCount,
  },
];

export default CommonRoute;
