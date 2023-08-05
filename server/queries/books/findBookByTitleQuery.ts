import { Book } from "../../models";

const findBookByTitleQuery = (title: string) => Book.findOne({ where: { title } });

export default findBookByTitleQuery;
