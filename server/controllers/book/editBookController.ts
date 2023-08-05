import { Request, Response } from "express";
import updateBookValidation from "../../validation/book/editBook";
import { updateBookQuery } from "../../queries/books";
import { UpdateBookInterface } from "../../interfaces/book";
import { NotFoundException } from "../../utils/exceptions";
import { Message } from "../../config/messages";

const editBookController = async (req: Request, res: Response) => {
  const { title, description, publicationYear, author, category, price } = req.body;
  const { id } = req.params;

  await updateBookValidation(req.body);

  const book: UpdateBookInterface = {};

  if (title) book["title"] = title;
  if (description) book["description"] = description;
  if (publicationYear) book["publication_year"] = publicationYear;
  if (author) book["author"] = author;
  if (category) book["category"] = category;
  if (price) book["price"] = +price;

  const updatedData = await updateBookQuery(book, id);

  if (!updatedData[0]) throw new NotFoundException("The Book does not exist");

  res.json({ data: updatedData[1][0], message: Message.UPDATE_BOOK });
};

export default editBookController;
