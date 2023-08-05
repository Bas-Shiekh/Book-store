import { Book } from "../../models";

const deleteBookQuery = (bookId: string) => Book.destroy({
  where: { id: bookId },
});

export default deleteBookQuery;
