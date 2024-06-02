import { authenticate, checkRole } from "../middlewares/auth";
import {
  getUserById,
  GetUsers,
  createUser,
  updateUserUser,
  deleteUser,
  loginUser,
} from "../controllers/user.controllers";
import { Router } from "express";

const userRouter: Router = Router();

userRouter
  .route("/")
  .get(authenticate, checkRole(["admin"]), GetUsers)
  .post(createUser);
userRouter.route("/login").post(loginUser);
userRouter
  .route("/:id")
  .get(getUserById)
  .delete(authenticate, checkRole(["admin"]), deleteUser)
  .patch(authenticate, checkRole(["admin"]), updateUserUser);

export default userRouter;
