import { Book } from "../../models";

const findBookByIdQuery = (id: string) => Book.findOne({ where: { id } });

export default findBookByIdQuery;
