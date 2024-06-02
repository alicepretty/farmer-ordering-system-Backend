import { model, Schema } from "mongoose";
import { IOrder } from "../types/models.types";

const Order = new Schema<IOrder>(
  {
    farmer: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    quantity: {
      type: Number,
      required: [true, "quantity is required"],
      trim: true,
    },
    order_item_type: {
      type: String,
      enum: ["Fertilizer", "Seed"],
      required: true,
    },
    item: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    land: {
      type: Schema.Types.ObjectId,
      ref: "land",
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "New",
      enum: ["New", "Processed", "Cancelled"],
    },
    amount: {
      type: Number,
      required: [true, "Enter order amount"],
    },
  },
  { timestamps: true }
);

export default model<IOrder>("order", Order);
