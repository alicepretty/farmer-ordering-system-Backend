import { Request, Response } from "express";
import landServices from "../services/land.services";
import apiResponse from "../utils/apiResponse";
import {validateLand} from "../validations/land.validation"

export const createLand = async (req: Request, res: Response) => {
  const valid = validateLand(req.body);
  if (valid) {
    const land = await landServices.createLand(req.body);
    if (land) {
      apiResponse(res, 201, "Land created successfully", land);
    } else {
      apiResponse(res, 404, "Creating land failed", null);
    }
  }
    else {
    apiResponse(
      res,
      400,
      "not valid",
      `could not validate due to invalid ${valid.error.details[0].path}`
    );
  }
 
};

export const getLands = async (req: Request, res: Response) => {
  const lands = await landServices.getLands();
  if (lands) {
    apiResponse(res, 200, "List of lands", lands);
  } else {
    apiResponse(res, 404, "No lands found", null);
  }
};

export const getLandById = async (req: Request, res: Response) => {
  const land = await landServices.getLandById(req.params.id);
  if (land) {
    apiResponse(res, 200, "Land details", land);
  } else {
    apiResponse(res, 500, "Could not find the land", null);
  }
};

export const updateLand = async (req: Request, res: Response) => {
  const land = await landServices.updateLandById(req.params.id, req.body);

  if (land) {
    apiResponse(res, 200, "Land updated", land);
  } else {
    apiResponse(res, 400, "Land not updated", null);
  }
};

export const deleteLand = async (req: Request, res: Response) => {
  const land = await landServices.deleteLandById(req.params.id);
  if (land) {
    apiResponse(res, 200, "Land deleted", null);
  } else {
    apiResponse(res, 400, "Land not deleted", null);
  }
};
