import { Router } from "express";
import * as landControllers from "../controllers/land.controllers";
import { authenticate, checkRole } from "../middlewares/auth"; 

const landRouter: Router = Router();
landRouter.route("/").get(landControllers.getLands);

landRouter.use(authenticate);

landRouter
  .route("/")
  .post(checkRole(["admin", "farmer"]), landControllers.createLand); 

landRouter
  .route("/:id")
  .get(landControllers.getLandById)
  .patch(checkRole(["admin", "farmer"]), landControllers.updateLand)
  .delete(checkRole(["admin"]), landControllers.deleteLand); 

export default landRouter;
