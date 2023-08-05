import { Response, NextFunction } from "express";

import { verifyToken } from "../utils/jwtServices";
import {
  TokenPayloadInterface,
  UserRequestInterface,
} from "../interfaces/payload";
import { UnauthorizedException } from "../utils/exceptions";

const isAuth = async (
  req: UserRequestInterface,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthorizedException();
  }

  const verified: TokenPayloadInterface = await verifyToken(token);
  req.user = verified;
  next();
};

export default isAuth;
