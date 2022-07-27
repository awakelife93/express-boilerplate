import config from "@/config";
import { Application } from "express";
import http from "http";

const createServer = (server: Application): void => {
  http
    .createServer(server)
    .listen(config.port, () => console.log(`App Listen Port ${config.port}`));
};

export default createServer;
