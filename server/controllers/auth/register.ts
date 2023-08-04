import { NextFunction, Request, Response } from "express";
import { hash } from "bcryptjs";
import registerValidation from "../../validation/register";
import { registerQuery, findUserByEmailQuery } from "../../queries/auth";
import CustomError from "../../utils/customError";
import { signToken } from "../../utils/jwtServices";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password, confirmationPassword } =
      req.body;

    await registerValidation({
      firstName,
      lastName,
      email,
      password,
      confirmationPassword,
    });

    const doesEmailExist = await findUserByEmailQuery(email);
    if (doesEmailExist) { throw new CustomError(422, "The email does already exist!"); }

    const hashedPassword = await hash(password, 12);

    const createdUser: any = await registerQuery({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const payload = {
      id: createdUser.getDataValue("id"),
      firstName: createdUser.getDataValue("first_name"),
      lastName: createdUser.getDataValue("last_name"),
      email: createdUser.getDataValue("email"),
      image: createdUser.getDataValue("image"),
    };

    const token = await signToken(payload);

    res
      .cookie("token", token)
      .status(201)
      .json({
        data: payload,
        message: "Account is created successfully!",
        token,
      });
  } catch (error) {
    if (error.name === "ValidationError") {
      next(new CustomError(400, error.details[0].message));
    } else next(error);
  }
};

export default register;
