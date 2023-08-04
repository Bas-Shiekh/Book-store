import { Response, NextFunction } from "express";

import CustomError from "../utils/customError";
import { verifyToken } from "../utils/jwtServices";
import {
  TokenPayloadInterface,
  UserRequestInterface,
} from "../interfaces/payload";

const isAuth = async (
  req: UserRequestInterface,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new CustomError(401, "unauthorized");
  }

  const verified: TokenPayloadInterface = await verifyToken(token);
  req.user = verified;
  next();
};

export default isAuth;
