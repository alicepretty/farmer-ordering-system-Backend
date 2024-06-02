import { model, Schema } from "mongoose";
import { ISeed } from "../types/models.types";

const Seed = new Schema<ISeed>({
  quantity: {
    type: Number,
    required: [true, "Stock quantity is required"],
    trim: true,
  },
  fertilizer: {
    type: Schema.Types.ObjectId,
    ref: "fertilizer",
    required: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    trim: true,
  },
  title: {
    type: String,
    required: [true, "Seed name or title is required"],
    trim: true,
    unique: true,
  },
});

export default model<ISeed>("seed", Seed);
