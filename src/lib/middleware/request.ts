import { IRequest } from "@/lib";
import * as _ from "lodash";

export default async (request: IRequest): Promise<void> => {
  await createToken(request);
  await createItem(request);
};

const createToken = (request: IRequest): void => {
  if (!_.isUndefined(request.headers.authorization)) {
    const token = request.headers.authorization.replace("Bearer ", "");
    request.token = token ?? "";
  }
};

const createItem = async (request: IRequest): Promise<void> => {
  switch (request.method) {
    case "GET":
    case "DELETE":
      request.item = { ...request.query, ...request.params };
      break;
    case "POST":
    case "PUT":
    case "PATCH":
      request.item = { ...request.body, ...request.params };
      break;
  }
};
