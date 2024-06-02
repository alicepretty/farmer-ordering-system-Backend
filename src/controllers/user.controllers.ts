import { Request, Response } from "express";
import userServices from "../services/user.services";
import apiResponse from "../utils/apiResponse";
import {
  registerValidate,
  validateLogin,
} from "../validations/user.validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const GetUsers = async (req: Request, res: Response) => {
  const users = await userServices.getUsers();
  if (users) {
    apiResponse(res, 200, "List of users", users);
  } else {
    apiResponse(res, 404, "No user Found", null);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await userServices.getUserById(req.params.id);
  if (user) {
    apiResponse(res, 200, "User info", {
      full_names: user.full_names,
      email: user.email,
    });
  } else {
    apiResponse(res, 404, "No user Found", null);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const valid = registerValidate(req.body);
  if (!valid.error) {
    const existingUser = await userServices.getUserByEmail(req.body.email);
    if (existingUser) {
      apiResponse(res, 403, "User already exists", null);
    }
    const user = await userServices.createUser(req.body);
    if (user) {
      apiResponse(res, 200, "User Created", {
        full_names: user.full_names,
        email: user.email,
      });
    } else {
      apiResponse(res, 500, "could not  user", null);
    }
  } else {
    apiResponse(
      res,
      400,
      "not valid",
      `could not validate due to invalid ${valid.error.details[0].path}`
    );
  }
  
};

export const updateUserUser = async (req: Request, res: Response) => {
  const { role, status, _id } = req.body;

  if (status || role || _id) {
    apiResponse(res, 400, "Could not update user", null);
  } else {
    const user = await userServices.updateUserById(req.params.id, req.body);
    if (user) {
      apiResponse(res, 200, "User updated", user);
    } else {
      apiResponse(res, 500, "could not create user", null);
    }
  }
};

export const updateUserAdmin = async (req: Request, res: Response) => {
  const { _id } = req.body;
  if (_id) {
    apiResponse(res, 400, "Could not update user", null);
  } else {
    const user = await userServices.updateUserById(req.params.id, req.body);
    if (user) {
      apiResponse(res, 200, "User updated", user);
    } else {
      apiResponse(res, 500, "could not create user", null);
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const user = await userServices.deleteUserById(req.params.id);
  apiResponse(res, 204, "User deleted", null);
};

// login here

export const loginUser = async (req: Request, res: Response) => {
  const valid = validateLogin(req.body);
  if (valid.error) {
    apiResponse(
      res,
      400,
      "invalid",
      `Please provide valid  ${valid.error.details[0].path}`
    );
  }

  const user = await userServices.getUserByEmail(req.body.email);
  if (!user) {
    apiResponse(res, 400, "incorrect email", "try again");
    return;
  }
  const checkPassword = await bcrypt.compare(req.body.password, user.password);
  if (!checkPassword) {
    apiResponse(res, 401, "Incorrect email or password", "try again");
    return;
  }
  const payload = {
    email: user.email,
    id: user._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  const data = {
    success: true,
    token,
    user:{...user['_doc'], password: null, __v: undefined}

  };
  apiResponse(res, 200, "Logged in", data);
};
