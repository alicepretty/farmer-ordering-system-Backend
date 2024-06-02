import { model, Schema } from "mongoose";
import { IFertilizer } from "../types/models.types";

const Fertilizer = new Schema<IFertilizer>({
  quantity: {
    type: Number,
    required: [true, "Stock quantity is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    trim: true,
  },
  title: {
    type: String,
    required: [true, "Fertilizer name or title is required"],
    trim: true,
    unique: true,
  },
});

export default model<IFertilizer>("fertilizer", Fertilizer);
