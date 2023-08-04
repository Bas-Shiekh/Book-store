import { NextFunction, Request, Response } from "express";

import CustomError from "./customError";
import { Message } from "../config/messages";

const expressWrapper =
  (controller: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (err: any) {
      if (err.name === "ValidationError") {
        err.status = 422;
        err.message = Message.VALIDATION_ERROR;
      } else if (err.name === "JsonWebTokenError") {
        err.status = 401;
        err.message = "unauthorized";
      }
      next(
        new CustomError(
          err.status || 500,
          err.message || "Internal server error",
        ),
      );
    }
  };

export default expressWrapper;
