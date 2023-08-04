import Joi from "joi";

import { loginInterface } from "../../interfaces/auth";

const loginValidation = (body: loginInterface) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().alphanum().min(5)
      .max(15),
  });

  return schema.validateAsync(body);
};

export default loginValidation;
