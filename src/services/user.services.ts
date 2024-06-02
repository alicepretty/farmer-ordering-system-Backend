import { IUser } from "../types/models.types";
import User from "../models/User";

class UserService {
  async createUser(userData: IUser) {
    try {
      return await User.create(userData);
    } catch (error) {
      console.error("Error with creating user", error);
    }
  }

  async getUsers() {
    try {
      return await User.find();
    } catch (error) {
      console.error("Error with getting users", error);
    }
  }
  async getUserById(userId: string) {
    try {
      return await User.findById(userId);
    } catch (error) {
      console.error("Error with getting user", error);
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await User.findOne({ email: email });
    } catch (error) {
      console.error("Error with getting user", error);
    }
  }

  async deleteUserById(userId: string) {
    try {
      return await User.findByIdAndDelete(userId);
    } catch (error) {
      console.error("Error with getting user", error);
    }
  }

  async updateUserById(userId: string, userData: Partial<IUser>) {
    try {
      return await User.findByIdAndUpdate(userId, userData, {
        new: true,
      });
    } catch (error) {
      console.error("Error with getting user", error);
    }
  }
}

export default new UserService();
