import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const setMiddlewares = (app: express.Application) => {
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
};

export default setMiddlewares;
