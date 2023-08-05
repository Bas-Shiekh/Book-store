import { Response } from "express";
import { UserRequestInterface } from "../../interfaces/payload";
import { findAllBookQuery } from "../../queries/books";

interface Query {
  sort: string | undefined;
  search: string | undefined;
  category: string | undefined;
}

const getBooksController = async (req: UserRequestInterface, res: Response) => {
  const fields = [
    "price",
    "publication_year",
    "title",
    "createdAt",
    "updatedAt",
  ];
  const { sort, search, category } = req.query as unknown as Query;

  let preparedSort = sort?.split(":");
  if (preparedSort && !fields.includes(preparedSort[0])) {
    preparedSort = ["createdAt", "desc"];
  } else if (preparedSort && !["asc", "desc"].includes(preparedSort[1])) {
    preparedSort[1] = "asc";
  }

  const books = await findAllBookQuery({
    sort: preparedSort,
    search,
    category,
    userId: req.user.id,
  });

  res.json({ data: books });
};

export default getBooksController;
