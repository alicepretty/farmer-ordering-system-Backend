import { Request, Response, NextFunction } from "express";
import passport from "../config/passport.config";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res
        .status(401)
        .json({ error: "authorized. please login to continue" });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

export const checkRole =
  (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user;
    if (user && roles.includes(user.role)) {
      next();
    } else {
      res.status(403).json({ error: "Not authorised to perform this action " });
    }
  };
