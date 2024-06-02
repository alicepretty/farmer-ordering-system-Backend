import { model, Schema } from "mongoose";
import { ILand } from "../types/models.types";

const Land = new Schema<ILand>({
  farmer: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  size: {
    type: Number,
    required: [true, "Land size is required"],
    trim: true,
  },
  title: {
    type: String,
    required: [true, "land name or title is required"],
    trim: true,
    unique: true,
  },
});

export default model<ILand>("land", Land);
