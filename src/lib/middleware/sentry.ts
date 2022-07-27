import config from "@/config";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import { Application } from "express";

export const initializeSentry = (app: Application): void => {
  Sentry.init({
    dsn: config.sentryDSN,
    debug: config.NODE_ENV !== "production",
    tracesSampleRate: 1.0,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({
        app,
      }),
    ],
  });
};

export default Sentry;
