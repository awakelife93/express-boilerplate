import express from "express";
import { initializeMiddleWare } from "./middleware";

const createExpress = (): express.Application => {
  return initializeMiddleWare(express());
};

export default createExpress;
