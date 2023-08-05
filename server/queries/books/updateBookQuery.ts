import { UpdateBookInterface } from "../../interfaces/book";
import { Book } from "../../models";

const updateBookQuery =
  (bookData: UpdateBookInterface, id: string) => Book.update(
    { ...bookData },
    { where: { id }, returning: true },
  );

export default updateBookQuery;
