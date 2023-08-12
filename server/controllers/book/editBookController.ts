import { Request, Response } from "express";
import updateBookValidation from "../../validation/book/editBook";
import { updateBookQuery } from "../../queries/books";
import { UpdateBookInterface } from "../../interfaces/book";
import { BadRequestException, NotFoundException } from "../../utils/exceptions";
import { Message } from "../../config/messages";
import uploadImageToCloudinary from "../../utils/uploadImage";

const editBookController = async (req: Request, res: Response) => {
  const { title, description, publicationYear, author, category, price, image } = req.body;
  const { id } = req.params;

  await updateBookValidation({
    title,
    description,
    publication_year: publicationYear,
    author,
    category,
    price,
  });

  const book: UpdateBookInterface = {};

  if (title) book["title"] = title;
  if (description) book["description"] = description;
  if (publicationYear) book["publication_year"] = publicationYear;
  if (author) book["author"] = author;
  if (category) book["category"] = category;
  if (price) book["price"] = +price;
  if (image) {
    const imageData = await uploadImageToCloudinary(image);
    if (!imageData) throw new BadRequestException("Upload image issue");
    if (imageData) book["cover_image"] = imageData.url;
  }

  const updatedData = await updateBookQuery(book, id);

  if (!updatedData[0]) throw new NotFoundException("The Book does not exist");

  const bookData = updatedData[1][0];

  const payloadData = {
    id: bookData.getDataValue("id"),
    title: bookData.getDataValue("title"),
    description: bookData.getDataValue("description"),
    price: bookData.getDataValue("price"),
    coverImage: bookData.getDataValue("cover_image"),
    publicationYear: bookData.getDataValue("publication_year"),
    author: bookData.getDataValue("author"),
    category: bookData.getDataValue("category"),
    createdAt: bookData.getDataValue("createdAt"),
    updatedAt: bookData.getDataValue("updatedAt"),
    userId: bookData.getDataValue("user_id"),
  };

  res.json({ data: payloadData, message: Message.UPDATE_BOOK });
};

export default editBookController;
