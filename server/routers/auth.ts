import { registerController, loginController } from "../controllers/auth";
import expressWrapper from "../utils/expressWrapper";

const authRouter = require('express').Router();

authRouter.post("/auth/register", expressWrapper(registerController));
authRouter.post("/auth/login", expressWrapper(loginController));

export default authRouter;
