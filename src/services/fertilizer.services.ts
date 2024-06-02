 import { IFertilizer } from "../types/models.types";
 import Fertilizer from "../models/Fertilizer";

 class FertilizerService {
   async createFertilizer(fertilizerData: IFertilizer) {
     try {
       return await Fertilizer.create(fertilizerData);
     } catch (error) {
       console.error("Error with creating fertilizer", error);
       throw new Error("Error with creating fertilizer");
     }
   }

   async getFertilizers() {
     try {
       return await Fertilizer.find();
     } catch (error) {
       console.error("Error with getting fertilizers", error);
       throw new Error("Error with getting fertilizers");
     }
   }

   async getFertilizerById(fertilizerId: string) {
     try {
       return await Fertilizer.findById(fertilizerId);
     } catch (error) {
       console.error("Error with getting fertilizer", error);
       throw new Error("Error with getting fertilizer");
     }
   }

   async deleteFertilizerById(fertilizerId: string) {
     try {
       return await Fertilizer.findByIdAndDelete(fertilizerId);
     } catch (error) {
       console.error("Error with deleting fertilizer", error);
       throw new Error("Error with deleting fertilizer");
     }
   }

   async updateFertilizerById(
     fertilizerId: string,
     fertilizerData: Partial<IFertilizer>
   ) {
     try {
       return await Fertilizer.findByIdAndUpdate(fertilizerId, fertilizerData, {
         new: true,
       });
     } catch (error) {
       console.error("Error with updating fertilizer", error);
       throw new Error("Error with updating fertilizer");
     }
   }
 }

 export default new FertilizerService();
