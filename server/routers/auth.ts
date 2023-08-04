import {
  registerController,
  loginController,
  verifyMeController,
} from "../controllers/auth";
import { isAuth } from "../middlewares";
import expressWrapper from "../utils/expressWrapper";

const authRouter = require('express').Router();

authRouter.post("/register", expressWrapper(registerController));
authRouter.post("/login", expressWrapper(loginController));
authRouter.get(
  "/users/me",
  expressWrapper(isAuth),
  expressWrapper(verifyMeController),
);

export default authRouter;
