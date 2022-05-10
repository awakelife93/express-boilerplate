import { IRequest, UnknownObject } from "@/lib";
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
      const query: UnknownObject = { ...request.query, ...request.params };
      request.item = query;
      break;
    case "POST":
    case "PUT":
    case "PATCH":
      const body: UnknownObject = { ...request.body, ...request.params };
      request.item = body;
      break;
  }
};
