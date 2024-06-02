import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
} from "../controllers/order.controllers";
import { authenticate, checkRole } from "../middlewares/auth";

const orderRouter: Router = Router();
orderRouter.use(authenticate);

orderRouter
  .route("/")
  .get(getOrders)
  .post(authenticate, checkRole(["admin", "farmer"]), createOrder);

orderRouter
  .route("/:id")
  .get(getOrderById)
  .patch(checkRole(["admin"]), updateOrderById)
  .delete(checkRole(["admin"]), deleteOrderById);

export default orderRouter;
