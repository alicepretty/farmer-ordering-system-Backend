import express from "express";
import setMiddlewares from "./utils/setMiddlewares";
import setRoutes from "./utils/setRoutes";
const app: express.Application = express();
setMiddlewares(app);
setRoutes(app);
export default app;
