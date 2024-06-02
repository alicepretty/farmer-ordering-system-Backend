import Joi from "joi";

export const validateLogin = (login: { email: string; password: string }) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(36).required(),
  });

  return loginSchema.validate(login);
};

export const registerValidate = (registerData: {
  full_names: string;
  email: string;
  password: string;
}) => {
  const registerSchema = Joi.object({
    full_names: Joi.string().min(6).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(36).required(),
    role: Joi.string(),
  });

  return registerSchema.validate(registerData);
};
