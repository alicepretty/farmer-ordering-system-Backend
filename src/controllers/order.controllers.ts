import { Request, Response } from "express";
import orderServices from "../services/order.services";
import apiResponse from "../utils/apiResponse";
import { ObjectId } from "mongodb";
import landServices from "../services/land.services";
import fertilizerServices from "../services/fertilizer.services";
import seedServices from "../services/seed.services";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const loggedUser: any = req.user;

    // check if land belong to user
    const userId: ObjectId = new ObjectId(loggedUser._id);
    const landId: ObjectId = new ObjectId(req.body.land);

    // check land
    const land = await landServices.getLandByIdUser(landId, userId);

    if (land != null) {
      // get order amount
      const item_type: string = req.body.order_item_type;

      let item: any;
      if (item_type == "Fertilizer") {
        if (req.body.quantity / 3 > land.size) {
          item = null;
        } else {
          item = await fertilizerServices.getFertilizerById(req.body.item);
        }
      } else if (item_type == "Seed") {
        // validate if land size and matches seed constraints
        if (land.size / req.body.quantity > 1) {
          item = null;
        } else {
          item = await seedServices.getSeedById(req.body.item);
        }
      }
      const item_amount = item.price * req.body.quantity;
      // validate if land size and matches fertilizer constraints
      if (item != null) {
        const orderData = {
          farmer: loggedUser._id,
          order_item_type: item_type, // can be fertilizer or seed
          amount: item_amount,
          quantity: req.body.quantity,
          land: land._id,
          item: item._id,
        };

        const order = await orderServices.createOrder(orderData);
        if (order) {
          apiResponse(res, 201, "Order created successfully", order);
        } else {
          return apiResponse(res, 400, "Failed to create order", null);
        }
      } else {
        return apiResponse(res, 400, "Could not get item information", null);
      }
    } else {
      return apiResponse(res, 400, "Could not get land information", null);
    }
  } catch (error) {
    console.error("Error creating order", error);
    apiResponse(res, 500, "Internal server error", null);
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderServices.getOrders();
    if (orders) {
      apiResponse(res, 200, "List of orders", orders);
    } else {
      apiResponse(res, 404, "No orders found", null);
    }
  } catch (error) {
    console.error("Error getting orders", error);
    apiResponse(res, 500, "Internal server error", null);
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await orderServices.getOrderById(req.params.id);
    if (order) {
      apiResponse(res, 200, "Order details", order);
    } else {
      apiResponse(res, 404, "Order not found", null);
    }
  } catch (error) {
    console.error("Error getting order", error);
    apiResponse(res, 500, "Internal server error", null);
  }
};

export const updateOrderById = async (req: Request, res: Response) => {
  try {
    const order = await orderServices.updateOrderById(req.params.id, req.body);
    if (order) {
      apiResponse(res, 200, "Order updated successfully", order);
    } else {
      apiResponse(res, 404, "Order not found", null);
    }
  } catch (error) {
    console.error("Error updating order", error);
    apiResponse(res, 500, "Internal server error", null);
  }
};

export const deleteOrderById = async (req: Request, res: Response) => {
  try {
    const order = await orderServices.deleteOrderById(req.params.id);
    if (order) {
      apiResponse(res, 204, "Order deleted successfully", null);
    } else {
      apiResponse(res, 404, "Order not found", null);
    }
  } catch (error) {
    console.error("Error deleting order", error);
    apiResponse(res, 500, "Internal server error", null);
  }
};
