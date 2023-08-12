import { Request, Response } from "express";
import { findBookByIdQuery } from "../../queries/books";
import { NotFoundException } from "../../utils/exceptions";

const getBookController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const bookData = await findBookByIdQuery(id);

  if (!bookData) throw new NotFoundException("The Book does not exist");

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

  res.json({ data: payloadData });
};

export default getBookController;
