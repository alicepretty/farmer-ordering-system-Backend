import { Response } from "express";

const apiResponse = (
  res: Response,
  code: number,
  message: String,
  data: any
) => {
  res.status(code).send({ message, data });
};

export default apiResponse;
