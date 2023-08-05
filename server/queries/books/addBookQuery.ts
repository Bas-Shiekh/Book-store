import { AddBookQueryInterface } from "../../interfaces/book";
import { Book } from "../../models";

const addBookQuery = (book: AddBookQueryInterface) => Book.create({ ...book });

export default addBookQuery;
