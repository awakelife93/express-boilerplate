import config from "@/config";
import * as cors from "cors";
import * as express from "express";
import helmet from "helmet";
import * as path from "path";
import Sentry from "./sentry";

export const createExpress = (): express.Application => {
  const app: express.Application = express();

  app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);
  app.use(Sentry.Handlers.tracingHandler());
  app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler);
  app.use(helmet());
  app.use(
    cors({
      origin: config.origin,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));

  return app;
};
