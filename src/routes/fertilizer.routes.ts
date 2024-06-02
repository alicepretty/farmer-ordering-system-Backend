import { Router } from "express";
import {
  createFertilizer,
  getFertilizers,
  getFertilizerById,
  updateFertilizer,
  deleteFertilizer,
} from "../controllers/fertilizer.controllers";
import { authenticate, checkRole } from "../middlewares/auth";

const fertilizerRouter: Router = Router();
fertilizerRouter.use(authenticate);

fertilizerRouter.route("/").get(getFertilizers);

fertilizerRouter.route("/").post(checkRole(["admin"]), createFertilizer);
fertilizerRouter
  .route("/:id")
  .get(getFertilizerById)
  .patch(checkRole(["admin"]), updateFertilizer)
  .delete(checkRole(["admin"]), deleteFertilizer);

export default fertilizerRouter;
