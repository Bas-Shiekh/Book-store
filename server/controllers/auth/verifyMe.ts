import { Response } from 'express';
import { UserRequestInterface } from "../../interfaces/payload";
import { findUserByIdQuery } from "../../queries/auth";
import CustomError from "../../utils/customError";

const verifyMeController = async (req: UserRequestInterface, res: Response) => {
  const { user } = req;
  const userData = await findUserByIdQuery(user.id);
  if (!userData) throw new CustomError(401, "unauthorized");

  const payload = {
    id: userData.getDataValue("id"),
    firstName: userData.getDataValue("first_name"),
    lastName: userData.getDataValue("last_name"),
    email: userData.getDataValue("email"),
    image: userData.getDataValue("image"),
  };

  res.json({ data: payload });
};

export default verifyMeController;
