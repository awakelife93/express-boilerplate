import { IRequest } from "@/lib";
import _ from "lodash";

const createToken = (request: IRequest): void => {
  if (!_.isUndefined(request.headers.authorization)) {
    request.token = request.headers.authorization.replace("Bearer ", "");
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

const generateRequest = async (request: IRequest): Promise<void> => {
  await createToken(request);
  await createItem(request);
};

export default generateRequest;
