import { ILand } from "../types/models.types";
import Land from "../models/Land";
import { ObjectId } from "mongodb";

class LandService {
  async createLand(landData: ILand) {
    try {
      return await Land.create(landData);
    } catch (error) {
      console.error("Error with creating land", error);
    }
  }

  async getLands() {
    try {
      return await Land.find();
    } catch (error) {
      console.error("Error with getting lands", error);
    }
  }

  async getLandById(landId: string) {
    try {
      return await Land.findById(landId);
    } catch (error) {
      console.error("Error with getting land", error);
    }
  }

  //  need to check land first
  async getLandByIdUser(landId: ObjectId, UserId: ObjectId) {
    try {
      return await Land.findOne({ _id: landId, farmer: UserId });
    } catch (error) {
      console.error("Error with getting land", error);
    }
  }

  async deleteLandById(landId: string) {
    try {
      return await Land.findByIdAndDelete(landId);
    } catch (error) {
      console.error("Error with deleting land", error);
    }
  }

  async updateLandById(landId: string, landData: Partial<ILand>) {
    try {
      return await Land.findByIdAndUpdate(landId, landData, {
        new: true,
      });
    } catch (error) {
      console.error("Error with updating land", error);
    }
  }
}

export default new LandService();
