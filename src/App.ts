import {
  AppRepository,
  createDevelopmentExpress,
  createProductionExpress,
} from "@/lib";
import { Application } from "express";
import * as _ from "lodash";
import config from "./config";
import {
  connectMysql,
  connectRepository,
  createRoute,
  createServer,
  initializeSentry,
} from "./lib";
import redis from "./lib/database/redis";
import { generateConfigLog } from "./utils";

class App {
  private onInitializeSentry(server: Application): void {
    console.log("App Initialize Sentry");
    initializeSentry(server);
  }

  private onCreateRoute(server: Application): void {
    console.log("App Created Route");
    createRoute(server);
  }

  private onCreateServer(server: Application): void {
    console.log("App Created Server");
    createServer(server);
  }

  private async onConnectDB(): Promise<void> {
    console.log("App Connected DB");
    await connectMysql();
    await redis.connectRedis();
  }

  private async onConnectRepository(): Promise<void> {
    console.log("App Connected Repository");
    await connectRepository();
  }

  private async onCreateTestSample(): Promise<void> {
    console.log("App Created Test Data");
    await AppRepository.generateTestData();
  }

  private onCreateLocalHostApp = async (): Promise<void> => {
    const server: Application = createDevelopmentExpress();

    this.onCreateRoute(server);
    this.onCreateServer(server);
    await this.onConnectDB();
    await this.onConnectRepository();
    await this.onCreateTestSample();
  };

  // * localhost환경과 달라야 할 경우 확장
  private onCreateDevelopmentApp = this.onCreateLocalHostApp;

  private onCreateProductionApp = async (): Promise<void> => {
    const server: Application = createProductionExpress();

    this.onInitializeSentry(server);
    this.onCreateRoute(server);
    this.onCreateServer(server);
    await this.onConnectDB();
    await this.onConnectRepository();
  };

  private getApplication = (): Function => {
    const applications = {
      production: this.onCreateProductionApp,
      development: this.onCreateDevelopmentApp,
      localhost: this.onCreateLocalHostApp,
    };

    const application = applications[config.NODE_ENV];

    if (_.isFunction(application)) {
      return application;
    } else {
      console.log(`NODE_ENV is Undefined!!! start localhost mode`);
      config.NODE_ENV = "localhost";
      return this.onCreateLocalHostApp;
    }
  };

  startApplication = async (): Promise<void> => {
    try {
      generateConfigLog();
      const application = this.getApplication();
      await application();
    } catch (error: unknown) {
      console.log(error);
    }
  };
}

export default new App();
