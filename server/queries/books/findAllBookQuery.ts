import { Op } from "sequelize";
import { Book } from "../../models";
import { FindBooksQueryInterface } from "../../interfaces/book";

const findAllBookQuery = ({
  sort,
  search,
  category,
  userId,
}: FindBooksQueryInterface) => {
  const query: any = {
    where: { user_id: userId },
  };

  if (search) {
    query.where.title = { [Op.like]: `%${search}%` };
  }

  if (sort) {
    query.order = [sort];
  }

  if (category) {
    query.where.category = category;
  }

  return Book.findAll(query);
};

export default findAllBookQuery;
