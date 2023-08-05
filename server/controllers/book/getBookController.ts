import { Request, Response } from "express";
import { findBookByIdQuery } from "../../queries/books";
import { NotFoundException } from "../../utils/exceptions";

const getBookController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const bookData = await findBookByIdQuery(id);

  if (!bookData) throw new NotFoundException("The Book does not exist");

  res.json({ data: bookData });
};

export default getBookController;
