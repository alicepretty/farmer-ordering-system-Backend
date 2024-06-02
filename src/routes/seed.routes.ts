import { Router } from "express";
import {
  createSeed,
  getSeeds,
  getSeedById,
  updateSeed,
  deleteSeed,
} from "../controllers/seed.controllers";
import { authenticate, checkRole } from "../middlewares/auth"; 

const seedRouter: Router = Router();

seedRouter.use(authenticate);

seedRouter.route("/").get(getSeeds);

seedRouter
  .route("/")
  .post(checkRole(["admin"]), createSeed);
seedRouter.route("/:id").get(getSeedById); 

seedRouter
  .route("/:id")
  .patch(checkRole(["admin"]), updateSeed) 
  .delete(checkRole(["admin"]), deleteSeed); 

export default seedRouter;
