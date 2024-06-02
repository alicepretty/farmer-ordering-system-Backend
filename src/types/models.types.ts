import { Document, Types } from "mongoose";

export interface IUser extends Document {
  full_names: string;
  email: string;
  password: string;
  role: string;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFertilizer extends Document {
  quantity: number;
  title: string;
  price: number;
}

export interface ISeed extends Document {
  quantity: number;
  title: string;
  price: number;
  fertilizer: Types.ObjectId;
}

export interface ILand extends Document {
  farmer: Types.ObjectId;
  size: number;
  title: string;
}

export interface IOrder extends Document {
  farmer: Types.ObjectId;
  order_item_type: string;
  item: Types.ObjectId;
  land: Types.ObjectId;
  quantity: number;
  amount: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}
