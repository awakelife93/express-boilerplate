import express from "express";
import { initializeMiddleWare } from "./middleware";

export default (): express.Application => {
  return initializeMiddleWare(express());
};
