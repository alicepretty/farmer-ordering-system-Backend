import { Request, Response } from "express";
import seedServices from "../services/seed.services";
import apiResponse from "../utils/apiResponse";

export const createSeed = async (req: Request, res: Response) => {
  try {
    const seed = await seedServices.createSeed(req.body);
    if (seed) {
      apiResponse(res, 201, "Seed created successfully", seed);
    } else {
      apiResponse(res, 500, "Failed to create seed", null);
    }
  } catch (error) {
    apiResponse(res, 500, error.message, null);
  }
};

export const getSeeds = async (req: Request, res: Response) => {
  try {
    const seeds = await seedServices.getSeeds();
    if (seeds) {
      apiResponse(res, 200, "List of seeds", seeds);
    } else {
      apiResponse(res, 404, "No seeds found", null);
    }
  } catch (error) {
    apiResponse(res, 500, error.message, null);
  }
};

export const getSeedById = async (req: Request, res: Response) => {
  try {
    const seed = await seedServices.getSeedById(req.params.id);
    if (seed) {
      apiResponse(res, 200, "Seed details", seed);
    } else {
      apiResponse(res, 404, "Seed not found", null);
    }
  } catch (error) {
    apiResponse(res, 500, error.message, null);
  }
};

export const updateSeed = async (req: Request, res: Response) => {
  try {
    const seed = await seedServices.updateSeedById(req.params.id, req.body);
    if (seed) {
      apiResponse(res, 200, "Seed updated successfully", seed);
    } else {
      apiResponse(res, 500, "Failed to update seed", null);
    }
  } catch (error) {
    apiResponse(res, 500, error.message, null);
  }
};

export const deleteSeed = async (req: Request, res: Response) => {
  try {
    const seed = await seedServices.deleteSeedById(req.params.id);
    if (seed) {
      apiResponse(res, 204, "Seed deleted successfully", null);
    } else {
      apiResponse(res, 500, "Failed to delete seed", null);
    }
  } catch (error) {
    apiResponse(res, 500, error.message, null);
  }
};
