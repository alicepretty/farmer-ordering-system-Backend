import { ISeed } from "../types/models.types";
import Seed from "../models/Seed";

class SeedService {
  async createSeed(seedData: ISeed) {
    try {
      return await Seed.create(seedData);
    } catch (error) {
      console.error("Error with creating seed", error);
      throw new Error("Error with creating seed");
    }
  }

  async getSeeds() {
    try {
      return await Seed.find();
    } catch (error) {
      console.error("Error with getting seeds", error);
      throw new Error("Error with getting seeds");
    }
  }

  async getSeedById(seedId: string) {
    try {
      return await Seed.findById(seedId);
    } catch (error) {
      console.error("Error with getting seed", error);
      throw new Error("Error with getting seed");
    }
  }

  async deleteSeedById(seedId: string) {
    try {
      return await Seed.findByIdAndDelete(seedId);
    } catch (error) {
      console.error("Error with deleting seed", error);
      throw new Error("Error with deleting seed");
    }
  }

  async updateSeedById(seedId: string, seedData: Partial<ISeed>) {
    try {
      return await Seed.findByIdAndUpdate(seedId, seedData, { new: true });
    } catch (error) {
      console.error("Error with updating seed", error);
      throw new Error("Error with updating seed");
    }
  }
}

export default new SeedService();
