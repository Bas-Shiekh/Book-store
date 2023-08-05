import { Request, Response } from "express";
import { deleteBookQuery } from "../../queries/books";
import { Message } from "../../config/messages";
import { NotFoundException } from "../../utils/exceptions";

const deleteBookController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const isDeletedBook = await deleteBookQuery(id);

  if (!isDeletedBook) throw new NotFoundException("Book not found");

  res.json({ id, message: Message.DELETE_BOOK });
};

export default deleteBookController;
