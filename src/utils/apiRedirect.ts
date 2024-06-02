import { config } from "dotenv";
import express from "express";

config();
// const app_fe_url: string = process.env.APP_FE;
export const redirectTohome = (req: express.Request, res: express.Response) => {
//   res.status(301).redirect(app_fe_url);
};
