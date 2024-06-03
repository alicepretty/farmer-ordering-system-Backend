import express from "express";
import { redirectToDocumentation } from "./apiRedirect";
import userRouter from "./../routes/user.routes";
import landRouter from "./../routes/land.routes";
import fertilizerRouter from "./../routes/fertilizer.routes";
import seedRouter from "./../routes/seed.routes";
import orderRouter from "./../routes/order.routes";

const setRoutes = (app: express.Application) => {
  app.get(["/", "/api"], redirectToDocumentation);

  app.use("/api/users", userRouter);
  app.use("/api/lands", landRouter);
  app.use("/api/seeds", seedRouter);
  app.use("/api/fertilizers", fertilizerRouter);
  app.use("/api/orders", orderRouter);
};

export default setRoutes;
