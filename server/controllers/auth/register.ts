import { Request, Response } from "express";
import { hash } from "bcryptjs";
import { registerValidation } from "../../validation/auth";
import { registerQuery, findUserByEmailQuery } from "../../queries/auth";
import { signToken } from "../../utils/jwtServices";
import { Message } from "../../config/messages";
import { BadRequestException } from "../../utils/exceptions";
import uploadImageToCloudinary from "../../utils/uploadImage";

const registerController = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, confirmationPassword, image } =
    req.body;

  await registerValidation({
    firstName,
    lastName,
    email,
    password,
    confirmationPassword,
  });

  const emailExist = await findUserByEmailQuery(email);
  if (emailExist) {
    throw new BadRequestException("The email does already exist!");
  }

  const imageData = await uploadImageToCloudinary(image);

  if (!imageData) {
    throw new BadRequestException("Upload image issue");
  }

  const hashedPassword = await hash(password, 12);

  const createdUser: any = await registerQuery({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    image: imageData.url,
  });

  const payload = {
    id: createdUser.getDataValue("id"),
    firstName: createdUser.getDataValue("first_name"),
    lastName: createdUser.getDataValue("last_name"),
    email: createdUser.getDataValue("email"),
    image: createdUser.getDataValue("image"),
  };

  const token = await signToken(payload);

  res.cookie("token", token).status(201).json({
    data: payload,
    message: Message.REGISTER,
  });
};

export default registerController;
