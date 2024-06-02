import Joi from "joi";

export const validateSeed = (landData: { title: string; quantity: number }) => {
  const landSchema = Joi.object({
    farmer: Joi.string().required(),
    size: Joi.number().required().min(0),
  });

  return landSchema.validate(landData);
};
