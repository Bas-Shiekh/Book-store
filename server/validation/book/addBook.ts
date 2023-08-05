import Joi from "joi";

import { AddBookInterface } from "../../interfaces/book";

const addBookValidation = (body: AddBookInterface) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    publicationYear: Joi.string(),
    author: Joi.string(),
    category: Joi.string(),
  });

  return schema.validateAsync(body);
};

export default addBookValidation;
