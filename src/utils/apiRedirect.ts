import { config } from "dotenv";
import express from "express";

config();
// const app_fe_url: string = process.env.APP_FE;
export const redirectTohome = (req: express.Request, res: express.Response) => {
  //   res.status(301).redirect(app_fe_url);
};

export const redirectToDocumentation = (
  req: express.Request,
  res: express.Response
) => {
  res.redirect("https://documenter.getpostman.com/view/32403169/2sA3Qy58b4");
};
