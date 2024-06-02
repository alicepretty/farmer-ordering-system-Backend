import Joi from "joi";

export const validateFertilizer = (fertilizerData: {
  title: string;
  quantity: number;
}) => {
  const fertilizerSchema = Joi.object({
    farmer: Joi.string().required(),
    size: Joi.number().required().min(0),
  });

  return fertilizerSchema.validate(fertilizerData);
};
