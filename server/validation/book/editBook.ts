import Joi from "joi";
import { UpdateBookInterface } from "../../interfaces/book";

const updateBookValidation = (body: UpdateBookInterface) => {
  const schema = Joi.object({
    title: Joi.string().empty().optional(),
    description: Joi.string().empty().optional(),
    price: Joi.number().empty().optional(),
    publication_year: Joi.number().empty().optional(),
    author: Joi.string().empty().optional(),
    category: Joi.string().empty().optional(),
    cover_image: Joi.string().empty().optional(),
  });

  return schema.validateAsync(body);
};

export default updateBookValidation;
