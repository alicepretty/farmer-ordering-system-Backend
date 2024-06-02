import { Request, Response } from "express";
import fertilizerServices from "../services/fertilizer.services";
import apiResponse from "../utils/apiResponse";
import { validateFertilizer } from "../validations/fertilizer.validation";
import seedServices from "../services/seed.services";

export const createFertilizer = async (req: Request, res: Response) => {
  try {
    const valid = validateFertilizer(req.body);
    if (valid) {
      const fertilizer = await fertilizerServices.createFertilizer(req.body);
      if (fertilizer) {
        apiResponse(res, 201, "Fertilizer created successfully", fertilizer);
      } else {
        apiResponse(res, 500, "Failed to create fertilizer", null);
      }
    } else {
      apiResponse(
        res,
        400,
        "not valid",
        `could not validate due to invalid ${valid.error.details[0].path}`
      );
    }
  } catch (error) {
    apiResponse(res, 500, error.message, null);
  }
};

export const getFertilizers = async (req: Request, res: Response) => {
  try {
    let items: any[] = [];

    const fertilizers = await fertilizerServices.getFertilizers();
    const seeds = await seedServices.getSeeds();

    fertilizers.map((item) => items.push(item));
    seeds.map((item) => items.push(item));

    if (items.length > 0) {
      apiResponse(res, 200, "List of items", items);
    } else {
      apiResponse(res, 404, "No fertilizers found", null);
    }
  } catch (error) {
    apiResponse(res, 500, error.message, null);
  }
};

export const getFertilizerById = async (req: Request, res: Response) => {
  try {
    const fertilizer = await fertilizerServices.getFertilizerById(
      req.params.id
    );
    if (fertilizer) {
      apiResponse(res, 200, "Fertilizer details", fertilizer);
    } else {
      apiResponse(res, 404, "Fertilizer not found", null);
    }
  } catch (error) {
    apiResponse(res, 500, error.message, null);
  }
};

export const updateFertilizer = async (req: Request, res: Response) => {
  try {
    const fertilizer = await fertilizerServices.updateFertilizerById(
      req.params.id,
      req.body
    );
    if (fertilizer) {
      apiResponse(res, 200, "Fertilizer updated successfully", fertilizer);
    } else {
      apiResponse(res, 500, "Failed to update fertilizer", null);
    }
  } catch (error) {
    apiResponse(res, 500, error.message, null);
  }
};

export const deleteFertilizer = async (req: Request, res: Response) => {
  try {
    const fertilizer = await fertilizerServices.deleteFertilizerById(
      req.params.id
    );
    if (fertilizer) {
      apiResponse(res, 204, "Fertilizer deleted successfully", null);
    } else {
      apiResponse(res, 500, "Failed to delete fertilizer", null);
    }
  } catch (error) {
    apiResponse(res, 500, error.message, null);
  }
};
