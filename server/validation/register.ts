import Joi from 'joi';

import { registerInterface } from '../interfaces/register';

const registerValidation = (body: registerInterface) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().alphanum().min(5)
      .max(15),
    confirmationPassword: Joi.ref('password'),
  });

  return schema.validateAsync(body);
};

export default registerValidation;
