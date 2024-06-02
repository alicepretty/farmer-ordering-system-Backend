import Joi from "joi";

export const validateLand = (landData: { farmer: string; size: number }) => {
  const landSchema = Joi.object({
    farmer: Joi.string().required(),
    size: Joi.number().required().min(0),
    title: Joi.string().required(),
  });

  return landSchema.validate(landData);
};
