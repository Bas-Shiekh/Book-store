import { addBookController } from '../controllers/book';
import { isAuth } from "../middlewares";
import expressWrapper from "../utils/expressWrapper";

const bookRouter = require("express").Router();

bookRouter.post(
  "",
  expressWrapper(isAuth),
  expressWrapper(addBookController),
);

export default bookRouter;
