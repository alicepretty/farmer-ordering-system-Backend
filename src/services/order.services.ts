import { IOrder } from "../types/models.types";
import Order from "../models/Order";

class OrderService {
  async createOrder(orderData: any) {
    try {
      return await Order.create(orderData);
    } catch (error) {
      console.error("Error with creating order", error);
      return null;
    }
  }

  async getOrders() {
    try {
      return await Order.find();
    } catch (error) {
      console.error("Error with getting orders", error);
      return null;
    }
  }

  async getOrderById(orderId: string) {
    try {
      return await Order.findById(orderId);
    } catch (error) {
      console.error("Error with getting order", error);
      return null;
    }
  }

  async deleteOrderById(orderId: string) {
    try {
      return await Order.findByIdAndDelete(orderId);
    } catch (error) {
      console.error("Error with deleting order", error);
      return null;
    }
  }

  async updateOrderById(orderId: string, orderData: Partial<IOrder>) {
    try {
      return await Order.findByIdAndUpdate(orderId, orderData, { new: true });
    } catch (error) {
      console.error("Error with updating order", error);
      return null;
    }
  }
}

export default new OrderService();
