import { Request, Response } from 'express';
import { compare } from "bcryptjs";
import { loginValidation } from '../../validation/auth';
import { findUserByEmailQuery } from '../../queries/auth';
import { signToken } from '../../utils/jwtServices';
import { Message } from '../../config/messages';
import { UnauthorizedException } from '../../utils/exceptions';

const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  await loginValidation({ email, password });
  const loginData: any = await findUserByEmailQuery(email);

  if (!loginData) {
    throw new UnauthorizedException("Invalid data email or password");
  }

  const hashedPassword = await compare(
    password,
    loginData.getDataValue("password"),
  );

  if (!hashedPassword) {
    throw new UnauthorizedException("Invalid data email or password");
  }

  const payload = {
    id: loginData.getDataValue("id"),
    firstName: loginData.getDataValue("first_name"),
    lastName: loginData.getDataValue("last_name"),
    email: loginData.getDataValue("email"),
    image: loginData.getDataValue("image"),
  };

  const token = await signToken(payload);

  res
    .cookie("token", token, { httpOnly: true })
    .json({ data: payload, message: Message.LOGIN });
};

export default loginController;
