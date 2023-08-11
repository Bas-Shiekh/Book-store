import { Response } from "express";
import { UserRequestInterface } from "../../interfaces/payload";
import { addBookValidation } from "../../validation/book";
import { addBookQuery, findBookByTitleQuery } from "../../queries/books";
import { Message } from "../../config/messages";
import { BadRequestException } from "../../utils/exceptions";

const addBookController = async (req: UserRequestInterface, res: Response) => {
  const { title, description, publicationYear, author, category, price, image } = req.body;
  const { id } = req.user;

  await addBookValidation({
    title,
    description,
    publicationYear,
    author,
    category,
    price,
  });

  const bookExist = await findBookByTitleQuery(title);
  if (bookExist) throw new BadRequestException("The Book is already exist");

  const book: any = {
    title,
    description,
    price,
    user_id: id,
  };

  if (publicationYear) book["publication_year"] = publicationYear;
  if (author) book["author"] = author;
  if (category) book["category"] = category;
  if (image) book["cover_image"] = image;

  const bookData = await addBookQuery(book);

  res.json({ data: bookData, message: Message.CREATE_BOOK });
};

export default addBookController;
