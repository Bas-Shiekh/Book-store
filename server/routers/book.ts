import {
  addBookController,
  deleteBookController,
  editBookController,
  getBookController,
  getBooksController,
} from "../controllers/book";
import { isAuth } from "../middlewares";
import expressWrapper from "../utils/expressWrapper";

const bookRouter = require("express").Router();

bookRouter.post(
  "",
  expressWrapper(isAuth),
  expressWrapper(addBookController),
);
bookRouter.get("", expressWrapper(isAuth), expressWrapper(getBooksController));
bookRouter.get("/:id", expressWrapper(isAuth), expressWrapper(getBookController));
bookRouter.delete(
  "/:id",
  expressWrapper(isAuth),
  expressWrapper(deleteBookController),
);
bookRouter.put(
  "/:id",
  expressWrapper(isAuth),
  expressWrapper(editBookController),
);

export default bookRouter;
