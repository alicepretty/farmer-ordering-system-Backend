import { Schema, model } from "mongoose";
import { IUser } from "../types/models.types";
import hashpassword from "../utils/hashpassword";

const User = new Schema<IUser>(
  {
    full_names: {
      type: String,
      required: [true, "Names are required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please create a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "farmer"],
      default: "farmer",
    },
    is_active: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

User.pre<IUser>("save", async function (next) {
  try {
    this.password = await hashpassword(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

export default model<IUser>("user", User);
